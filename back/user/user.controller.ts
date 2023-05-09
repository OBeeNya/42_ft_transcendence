import { Body, Controller, Get, Patch, UseGuards, Param, Delete } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { IntraGuard, JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

// @UseGuards(JwtGuard)
@UseGuards(IntraGuard)
@Controller('users')
export class UserController {

	constructor(private userService: UserService) {}

	// localhost:3000/users
	@Get()
	findAll() {
		// console.log("test findAll");
		return this.userService.findAll();
	}

	// localhost:3000/users/me
	@Get('me')
	getMe(@GetUser() user: User) {
		return (user);
	}
	
	// localhost:3000/users/name/:name
	@Get("name/:name")
	findOneByName(@Param("name") name: string) {
		// console.log("test findOneByName: name = ", name);
		return this.userService.findOneByName(name);
	}
	
	// localhost:3000/users/:id
	@Get(":id")
	findOneById(@Param("id") id: string) {
		// console.log("test findOneById: id= ", id);
		return this.userService.findOneById(id);
	}

	@Patch()
	editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
		return (this.userService.editUser(userId, dto));
	}

	@Delete(":id")
	deleteUserById(@Param("id") id: string) {
		return this.userService.deleteUserById(id);
	}

	@Delete("me/me")
	deleteMe(@GetUser() user: User) {
		return this.userService.deleteMe(user.name);
	}
}
