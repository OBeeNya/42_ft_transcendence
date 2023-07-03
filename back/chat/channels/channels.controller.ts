import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ChatService } from './channels.service';
import { CreateChannelDto } from './channels.dto';

@Controller('chat')
export class ChatController
{
	constructor(private readonly chatService: ChatService) {}

	@Post('createChannel')
	async createChannel(@Body() dto: CreateChannelDto) {
		return this.chatService.createChannel(dto);
	}
}
