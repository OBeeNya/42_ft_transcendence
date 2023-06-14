import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { DirectMessageService } from "./directMessage.service";
import { DirectMessageDto } from "./directMessage.dto";
import { UserService } from "user/user.service";

@WebSocketGateway({cors: {origin: "*"}})
export class DirectMessageGateway
{
	private userSocketMap = new Map<number, string>();

	constructor(private directMessageService: DirectMessageService, private userService: UserService) {}

	@WebSocketServer()
	server: Server;

	afterInit(server: Server)
	{
		console.log('Initialized!');
	}

	handleConnection(client: Socket)
	{
		console.log(`Client connected: ${client.id}`);
	}

	handleDisconnect(client: Socket)
	{
		console.log(`Client disconnected: ${client.id}`);
	}

	@SubscribeMessage('userConnected')
	handleUserConnected(@MessageBody() userId: number, @ConnectedSocket() client: Socket)
	{
		this.userSocketMap.set(userId, client.id);
		console.log(`User ${userId} connected with socket id ${client.id}`);
	}

	@SubscribeMessage('blockUser')
	async handleBlockUser(@MessageBody() data: {blockerId: number, blockedId: number},
						  @ConnectedSocket() client: Socket)
	{
		try
		{
			await this.userService.blockUser(data.blockerId, data.blockedId);
			client.emit('userBlocked', {blockerId: data.blockerId, blockedId: data.blockedId});
		}
		catch (error)
		{
			console.error('Error while blocking user:', error);
			client.emit('error', {message: 'There was an error blocking the user.', error: error.message});
		}
	}

	@SubscribeMessage('unblockUser')
	async handleUnblockUser(@MessageBody() data: {blockerId: number, blockedId: number},
							@ConnectedSocket() client: Socket)
	{
		try
		{
			await this.userService.unblockUser(data.blockerId, data.blockedId);
			client.emit('userUnblocked', {blockerId: data.blockerId, blockedId: data.blockedId});
		}
		catch (error)
		{
			console.error('Error while unblocking user:', error);
			client.emit('error', {message: 'There was an error unblocking the user.', error: error.message});
		}
	}

	@SubscribeMessage('privateMessage')
	async handlePrivateMessage(@MessageBody() data: DirectMessageDto, @ConnectedSocket() client: Socket)
	{
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
			client.emit('error', {message: 'There was an error sending your message.', error: error.message});
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
			client.emit('error', {message: 'There was an error getting your conversation.', error: error.message});
		}
	}
}
