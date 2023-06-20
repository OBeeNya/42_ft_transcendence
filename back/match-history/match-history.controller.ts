import { Controller, Patch, UseGuards, Get, Post, Body, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { MatchHistoryService } from './match-history.service';
import { CreateMatchDto } from './dto';


@UseGuards(JwtGuard) // ??? // A logged in user should not be able to freely modify history, so other type of guard to consider
@Controller('match-history')
export class MatchHistoryController {

	constructor(private historyService: MatchHistoryService) {}

	// localhost:3000/match-history
	@Get()
	findAll() {
		// console.log("test findAll matches");
		return this.historyService.findAll();
	}

	// localhost:3000/match-history/me
	@Get("me")
	findMyMatches(@GetUser() user: User) {
		// console.log("test findMyMatches matches: id = ", user.id);
		return this.historyService.findByUserId(user.id.toString());
	}

	// localhost:3000/match-history/:id
	@Get(":id")
	findByUserId(@Param("id") id: string) {
		// console.log("test findByUser matches: id = ", id);
		return this.historyService.findByUserId(id);
	}

	// localhost:3000/match-history/name/:name
	@Get("name/:name")
	findByUserName(@Param("name") name: string) {
		// console.log("test findByUserName matches: name = ", name);
		return this.historyService.findByUserName(name);
	}

	// la creation de match est obligatoirement faite par le user qui joue
	// @Post()
	// createMatch(@Body() dto: CreateMatchDto, @GetUser() user: User) {
	// 	console.log("dto", dto); 
	// 	this.historyService.create(dto, user);
	// }
}
