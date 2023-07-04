import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { PongService } from './pong.service';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('pong')
export class PongController {
    
	constructor(private pongService: PongService) {}
	
    @Get()
	setSocket() {
		return this.pongService.setSocket();
	}

	@Patch('addPlayer')
	addPlayer(@Body() add: string) {
		return (this.pongService.addPlayer());
	}

	@Patch('removePlayer')
	removePlayer(@Body() rem: string) {
		return (this.pongService.removePlayer());
	}

	@Get('getPlayers')
	getPlayers() {
		return (this.pongService.getPlayers());
	}

}
