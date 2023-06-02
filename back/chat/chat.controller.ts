import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController
{
	constructor(private readonly chatService: ChatService) {}

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

	@Get('search')
	async searchChannel(@Query('channelName') channelName: string)
	{
		return this.chatService.searchChannel(channelName);
	}
}
