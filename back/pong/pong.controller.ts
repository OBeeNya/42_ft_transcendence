import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
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

	@Patch('addPlayerToWaitingList')
	async addPlayerToWaitingList(@Body() player: PlayerDto) {
		return (await this.pongService.addPlayerToWaitingList(player));
	}

	@Patch('removePlayerFromWaitingList')
	async removePlayerFromWaitingList(@Body() player: PlayerDto) {
		return (await this.pongService.removePlayerFromWaitingList(player));
	}

	@Patch('emptyWaitingList')
	async emptyWaitingList() {
		return (await this.pongService.emptyWaitingList());
	}

	@Get()
	getWaitingList() {
		return (this.pongService.getWaitingList());
	}

}
