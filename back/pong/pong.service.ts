import { Injectable } from '@nestjs/common';
import { PlayerDto } from './dto';

@Injectable()
export class PongService {

	constructor() {}

    static waitingList: PlayerDto[] = [];

    setSocket() {
        console.log("test Pong route for server socket");

        const express = require('express');
        const app2 = express();
        // const server = app.listen(3002);




		return ("hello socket");
	}

	addPlayerToWaitingList(player: PlayerDto) {
        PongService.waitingList.push(player);
    }

	removePlayerFromWaitingList(player: PlayerDto) {
        for (const p of PongService.waitingList) {
            if (p.name === player.name) {
                const index = PongService.waitingList.indexOf(player);
                PongService.waitingList.splice(index, 1);
                break ;
            }
        }
    }

    createGame() {
        
    }

}
