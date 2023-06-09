import { Body, Controller, Get, UseGuards, Post } from '@nestjs/common';
import { PongService } from './pong.service';
import { JwtGuard } from '../auth/guard';
import { PlayerDto } from './dto';

@UseGuards(JwtGuard)
@Controller('pong')
export class PongController {
    
	constructor(private pongService: PongService) {}
	
    @Get()
	setSocket() {
        // console.log("controller pong");
		return this.pongService.setSocket();
	}

	@Post('addPlayerToWaitingList')
	addPlayerToWaitingList(@Body() player: PlayerDto) {
		return (this.pongService.addPlayerToWaitingList(player));
	}

	@Post('removePlayerFromWaitingList')
	removePlayerFromWaitingList(@Body() player: PlayerDto) {
		return (this.pongService.removePlayerFromWaitingList(player));
	}

	@Post('createGame')
	create_game() {
		return (this.pongService.createGame());
	}

}
