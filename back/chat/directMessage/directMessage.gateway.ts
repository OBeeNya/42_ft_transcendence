import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { DirectMessageService } from "./directMessage.service";
import { DirectMessageDto } from "./directMessage.dto";

@WebSocketGateway({cors: {origin: "*"}})
export class DirectMessageGateway
{
	constructor(private directMessageService: DirectMessageService) {}

	@WebSocketServer()
	server: Server; // this.server pour accéder aux méthodes propres aux websockets

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

	// est call chaque fois qu'un message avec l'event "privateMessage"
	// est reçu par le serveur Websocket

	@SubscribeMessage('privateMessage')
	async handlePrivateMessage(@MessageBody() data: DirectMessageDto,
							   @ConnectedSocket() client: Socket)
	{
		try
		{
			const newMessage = await this.directMessageService.create(data);
			console.log('Emitting privateMessage with data:', newMessage);
			this.server.to(data.receiverId.toString()).emit('privateMessage', newMessage);
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
			const messages = await this.directMessageService.getConversation(data.senderId,
																			 data.receiverId);
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
