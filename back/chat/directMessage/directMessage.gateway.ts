import { ConnectedSocket, MessageBody, SubscribeMessage,
		 WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { DirectMessageService } from "./directMessage.service";
import { DirectMessageDto } from "./directMessage.dto";
import { PrismaService } from "prisma_module/prisma.service";
import { BlockageService } from "../blockage/blockage.service";
import { BaseGateway } from "chat/base.gateway";

@WebSocketGateway({cors: {origin: "*"}})
export class DirectMessageGateway extends BaseGateway
{
	constructor(private directMessageService: DirectMessageService,
				private blockageService: BlockageService,
				private prisma: PrismaService)
	{
		super();
	}

	@SubscribeMessage('privateMessage')
	async handlePrivateMessage(@MessageBody() data: DirectMessageDto,
							   @ConnectedSocket() client: Socket)
	{
		console.log(`Message sent from ${data.senderId} to ${data.receiverId}`);

		if (await this.blockageService.isUserBlocked(data.receiverId, data.senderId))
		{
			console.error('Message blocked:', `User ${data.senderId} is blocked by ${data.receiverId}`);
			client.emit('error', {message: 'Your message could not be sent. You are blocked by this user.'});
			return;
		}

		try
		{
			const newMessage = await this.directMessageService.create(data);
			console.log('Emitting privateMessage with data:', newMessage);

			const receiverSocketId = this.userSocketMap.get(data.receiverId);

			if (receiverSocketId)
				this.server.to(receiverSocketId).emit('privateMessage', newMessage);

			this.server.to(data.receiverId.toString()).emit('privateMessage', newMessage);
			client.emit('privateMessage', newMessage);
		}
		catch (error)
		{
			console.error('Error while handling private message:', error);
			client.emit('error', {message: 'There was an error sending your message.',
								  error: error.message});
		}
	}

	@SubscribeMessage('getConversation')
	async handleGetConversation(@MessageBody() data: {senderId: number, receiverId: number},
								@ConnectedSocket() client: Socket)
	{
		try
		{
			const messages = await this.directMessageService.getConversation(data.senderId, data.receiverId);
			client.emit('conversation', messages);
		}
		catch (error)
		{
			console.error('Error while getting conversation:', error);
			client.emit('error', {message: 'There was an error getting your conversation.',
								  error: error.message});
		}
	}
}
