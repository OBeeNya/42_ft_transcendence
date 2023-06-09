import { Body, Controller, Get, Patch, UseGuards, Param, Delete, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PongService } from './pong.service';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('pong')
export class PongController {
    
	constructor(private pongService: PongService) {}
	
    @Get()
	setSocket() {
        console.log("controller pong");
		return this.pongService.setSocket();
	}

}
