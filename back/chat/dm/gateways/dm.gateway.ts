import { SubscribeMessage,
		 WebSocketGateway,
		 OnGatewayInit,
		 WebSocketServer,
		 OnGatewayConnection,
		 OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { DirectMessageService } from '../services/dm.service';

@WebSocketGateway({namespace: '/dm'})
export class DmGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	constructor(private dmService: DirectMessageService) {}

	@WebSocketServer() wss: Server; // this.wss pour accéder à l'instance du serveur WebSocket

	private logger: Logger = new Logger('DMGateway');

	// afterInit(), handleConnection() et handleDisconnect() ne font que log des messages

	afterInit(server: Server)
	{
		this.logger.log('Initialized!');
	}

	handleConnection(client: Socket, ...args: any[])
	{
		this.logger.log(`Client connected: ${client.id}`);
	}

	handleDisconnect(client: Socket)
	{
		this.logger.log(`Client disconnected: ${client.id}`);
	}

	// handleMessage() est déclenché chaque fois qu'un msg est envoyé au serveur
	// avec l'event "dmToServer"
	@SubscribeMessage('dmToServer')
	async handleMessage(client: Socket, payload: {senderId: number, receiverId: number,
											  content: string}): Promise<void>
	{
		try
		{
			await this.dmService.createDM(payload);
			client.to(payload.receiverId.toString()).emit('dmToClient', payload);
			client.emit('dmToClient', payload);
		}
		catch (error)
		{
			client.emit('error', {message: 'There was an error sending your message.'});
		}
	}

	// handleMessage() est déclenché chaque fois qu'un msg est envoyé au serveur
	// avec l'event "dmToServer"
	// @SubscribeMessage('dmToServer')
	// async handleMessage(client: Socket, payload: {senderId: number, receiverId: number,
	// 											  content: string}): Promise<void>
	// {
	// 	try
	// 	{
	// 		await this.dmService.createDM(payload);
	// 		this.wss.emit('dmToClient', payload);
	// 	}
	// 	catch (error)
	// 	{
	// 		client.emit('error', {message: 'There was an error sending your message.'});
	// 	}
	// }

	@SubscribeMessage('getHistory')
	async handleGetHistory(client: Socket, payload: {senderId: number,
										   receiverId: number}): Promise<void>
	{
		try
		{
			const history = await this.dmService.getDMs(payload.senderId, payload.receiverId);
			client.emit('history', history);
		}
		catch (error)
		{
			client.emit('error', {message: 'There was an error retrieving the history.'});
		}
	}
}
