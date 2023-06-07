import { Injectable } from '@nestjs/common';

@Injectable()
export class PongService {

	constructor() {}

    setSocket() {
        console.log("test Pong route for server socket");
		return ("hello socket");
	}
}
