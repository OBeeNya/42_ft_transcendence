import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChannelDto } from './chat.dto';

@Controller('chat')
export class ChatController
{
	constructor(private readonly chatService: ChatService) {}

	@Post('createChannel')
	async createChannel(@Body() dto: CreateChannelDto) {
		return this.chatService.createChannel(dto);
	}

	@Post('join')
	async joinChannel
	(
		@Body('userId') userId: number,
		@Body('chatId') chatId: number,
		@Body('password') password?: string
	)
	{
		return this.chatService.joinChannel(userId, chatId, password);
	}

	@Post('setPassword')
	async setChatPassword
	(
		@Body('userId') userId: number,
		@Body('chatId') chatId: number,
		@Body('password') password: string
	)
	{
		return this.chatService.setChatPassword(userId, chatId, password);
	}

	@Get('getchan')
	async getChannel()
	{
		return this.chatService.getChannel();
	}
}
