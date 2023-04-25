import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
// import { Controller, Get } from 'src/';

// localhost:3000/users
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService ) {}

	@Get()
	findAll(): User[] {
		return this.usersService.findAll();
	}

	// localhost:3000/users/:id
	@Get(':id')
	findOne(@Param('id') id: string) {
		console.log("id", id);
		return this.usersService.findOne(id); 
	}

	@Post()
	createUser(@Body() newUser: CreateUserDto) {
		console.log("newUser", newUser); 
		this.usersService.create(newUser);
	}

	// localhost:3000/users/:id
	@Patch(':id')
	updateUser(@Param('id') id: string, @Body() user: CreateUserDto ) {
		return this.usersService.update(id, user);
	}

	@Delete(':id')
	deleteUser(@Param('id') id: string) {
		return this.usersService.delete(id);
	}
}
