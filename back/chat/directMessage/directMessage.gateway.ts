import { ConnectedSocket, MessageBody, SubscribeMessage,
		 WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { DirectMessageService } from "./directMessage.service";
import { DirectMessageDto } from "./directMessage.dto";
import { PrismaService } from "prisma_module/prisma.service";

@WebSocketGateway({cors: {origin: "*"}})
export class DirectMessageGateway
{
	private userSocketMap = new Map<number, string>();

	constructor(private directMessageService: DirectMessageService,
				private prisma: PrismaService) {}

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
	async handleUserConnected(@MessageBody() userId: number,
							  @ConnectedSocket() client: Socket)
	{
		this.userSocketMap.set(userId, client.id);
		console.log(`User ${userId} connected with socket id ${client.id}`);

		const blockedUsers = await this.directMessageService.getBlockedUsers(userId); // new
		client.emit('blockedUsers', blockedUsers); // new
	}

	@SubscribeMessage('blockUser')
	async handleBlockUser(@MessageBody() data: {blockerId: number, blockedId: number},
						  @ConnectedSocket() client: Socket)
	{
		console.log(`Attempting to block user: ${data.blockedId} by user: ${data.blockerId}`);

		// Vérifie si l'utilisateur à bloquer existe
		const userToBlock = await this.prisma.user.findUnique({where: {id: data.blockedId}});
	
		if (!userToBlock)
		{
			client.emit('error', {message: 'The user you are trying to block does not exist.'});
			return;
		}

		// Vérifie si l'utilisateur est déjà bloqué
		if (await this.directMessageService.isUserBlocked(data.blockerId, data.blockedId))
		{
			client.emit('error', {message: 'You have already blocked this user.'});
			return;
		}

		try
		{
			await this.directMessageService.blockUser(data.blockerId, data.blockedId);
			console.log(`User ${data.blockedId} has been blocked by ${data.blockerId}`);
			client.emit('userBlocked', {blockerId: data.blockerId, blockedId: data.blockedId});
		}
		catch (error)
		{
			console.error('Error while blocking user:', error);
			client.emit('error', {message: 'There was an error blocking the user.',
								  error: error.message});
		}
	}

	@SubscribeMessage('unblockUser')
	async handleUnblockUser(@MessageBody() data: {blockerId: number, blockedId: number},
							@ConnectedSocket() client: Socket)
	{
		try
		{
			await this.directMessageService.unblockUser(data.blockerId, data.blockedId);
			client.emit('userUnblocked', {blockerId: data.blockerId, blockedId: data.blockedId});
		}
		catch (error)
		{
			console.error('Error while unblocking user:', error);
			client.emit('error', {message: 'There was an error unblocking the user.',
								  error: error.message});
		}
	}

	@SubscribeMessage('privateMessage')
	async handlePrivateMessage(@MessageBody() data: DirectMessageDto,
							   @ConnectedSocket() client: Socket)
	{
		console.log(`Message sent from ${data.senderId} to ${data.receiverId}`);

		try
		{
			// Vérifie si le receveur a bloqué l'expéditeur du message
			if (await this.directMessageService.isUserBlocked(data.receiverId, data.senderId))
			{
				console.log(`User ${data.receiverId} has blocked user ${data.senderId}`);
				client.emit('error', {message: 'You have been blocked by this user and \
											    cannot send them a message.'});
				return;
			}

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
			// Vérifie si l'utilisateur destinataire a bloqué l'utilisateur émetteur
			if (await this.directMessageService.isUserBlocked(data.receiverId, data.senderId))
			{
				client.emit('error', {message: 'You have been blocked by this user \
												and cannot access the conversation.'});
				return;
			}

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
