import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

export class BaseGateway
{
	protected userSocketMap = new Map<number, string>();

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
	}
}
