import { Injectable } from '@nestjs/common';

@Injectable()
export class PongService {

	constructor() {}

    setSocket() {
        console.log("test Pong route for server socket");

        const express = require('express');
        const app2 = express();
        // const server = app.listen(3002);

		return ("hello socket");
	}
}
