import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
import { BaseGateway } from "chat/base.gateway";
import { PrismaService } from "prisma_module/prisma.service";
import { ChannelsService } from "./channels.service";
import { Channel, ChatType, Message } from "@prisma/client";
import { Body } from "@nestjs/common";
import { CreateChannelDto, JoinRoomDto, MessageDto } from "./channels.dto";

@WebSocketGateway({cors: {origin: "*"}})
export class ChannelsGateway extends BaseGateway
{
	@WebSocketServer()
	server: Server;
	
	constructor(private prisma: PrismaService, private channelsService: ChannelsService) {
		super();
	}

	@SubscribeMessage('createChannel')
	async handleCreateChannel(@Body() createChannelDto: CreateChannelDto, @ConnectedSocket() client: Socket): Promise<WsResponse<Channel>> {
		const newChannel = await this.channelsService.createChannel(createChannelDto, this.socketUserMap.get(client.id));
		return { event: 'channelCreated', data: newChannel };
	}

	@SubscribeMessage('getChannels')
    async handleGetChannels(@ConnectedSocket() client: Socket): Promise<WsResponse<Channel[]>> {
        const channels = await this.channelsService.getAllChannels();
        return { event: 'channels', data: channels };
    }

	@SubscribeMessage('joinRoom')
	async handleJoinRoom(@MessageBody() joinRoomDto: JoinRoomDto, @ConnectedSocket() client: Socket): Promise<void> {
		const { roomId } = joinRoomDto;
		const userId = this.socketUserMap.get(client.id);
		client.join(roomId);
		await this.channelsService.addUserToChannel(roomId, userId);
	}

	@SubscribeMessage('sendMessageToRoom')
	async handleSendMessageToRoom(@MessageBody() messageDto: MessageDto, @ConnectedSocket() client: Socket) {
	  const { roomId, message } = messageDto;
	  this.channelsService.sendMessageToRoom(roomId, message, client);
	}

	@SubscribeMessage('getConversation')
	async handleGetConversation(@MessageBody() roomDetails: { roomId: string }, @ConnectedSocket() client: Socket): Promise<WsResponse<Message[]>> {
		const messages = await this.channelsService.getRoomMessages(roomDetails.roomId);
		return { event: 'conversation', data: messages };
	}
}
