import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
import { BaseGateway } from "chat/base.gateway";
import { PrismaService } from "prisma_module/prisma.service";
import { ChannelsService } from "./channels.service";
import { Channel, ChatType, ChanMessage } from "@prisma/client";
import { Body } from "@nestjs/common";
import { CreateChannelDto, JoinRoomDto, ChannelMessageDto } from "./channels.dto";


@WebSocketGateway({cors: {origin: "*"}})
export class ChannelsGateway extends BaseGateway
{
	@WebSocketServer()
	server: Server;
	
	constructor(private prisma: PrismaService, private channelsService: ChannelsService) {
		super();
	}

	@SubscribeMessage('createChannel')
	async handleCreateChannel(@Body() createChannelDto: CreateChannelDto): Promise<WsResponse<Channel>> {
		const newChannel = await this.channelsService.createChannel(createChannelDto);
		return { event: 'channelCreated', data: newChannel };
	}

	@SubscribeMessage('getChannels')
    async handleGetChannels(@ConnectedSocket() client: Socket): Promise<WsResponse<Channel[]>> {
        const channels = await this.channelsService.getAllChannels();
        return { event: 'channels', data: channels };
    }
	
	@SubscribeMessage('joinRoom')
	async handleJoinRoom(@MessageBody() joinRoomDto: JoinRoomDto, @ConnectedSocket() client: Socket) {
		
		try {
			const { channelId, userId, password} = joinRoomDto;
			await this.channelsService.addUserToChannel(channelId, parseInt(userId), password);
			client.join(channelId.toString());
			client.emit('passwordChecked', { correct: true });

		}
		catch (error) {
			client.emit('passwordChecked', {correct: false})
		}
	}

	isClientInRoom(clientId: string, roomId: string) {
		const room = this.server.sockets.adapter.rooms.get(roomId);
		return room ? room.has(clientId) : false;
	}

	@SubscribeMessage('channelMessage')
	async handleChannelMessage(@MessageBody() data: ChannelMessageDto,
							  @ConnectedSocket() client: Socket)
	{	
		try {
			//client.join(data.channelId.toString());
			const isClientin = this.isClientInRoom(client.id, data.channelId.toString());
			console.log(`Client ${client.id} is in room ${data.channelId}: ${isClientin}`);
			const newMessage = await this.channelsService.create(data);	
			this.server.to(data.channelId.toString()).emit('channelMessage', newMessage);
		}
		catch (error) {
			console.error('Error while handling channel message:', error);
			client.emit('error', {message: 'There was an error sending your message.',
								 error: error.message});
		}
	}

	@SubscribeMessage('getChannelConversation')
	async handleGetConversation(@MessageBody() roomDetails: { channelId: string }, @ConnectedSocket() client: Socket): Promise<WsResponse<ChanMessage[]>> {
		const messages = await this.channelsService.getRoomMessages(roomDetails.channelId);
		console.log(`Sending 'channelConversation' event with data:`, messages);
		return { event: 'channelConversation', data: messages };
	}

}
