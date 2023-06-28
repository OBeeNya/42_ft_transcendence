import { ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
import { BaseGateway } from "chat/base.gateway";
import { PrismaService } from "prisma_module/prisma.service";
import { ChannelsService } from "./channels.service";
import { Channel, ChatType } from "@prisma/client";
import { Body } from "@nestjs/common";
import { CreateChannelDto } from "./channels.dto";

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
		const ownerId = this.socketUserMap.get(client.id);
		console.log("OWWWWWWWWNERRR ID:  ", ownerId);
		const newChannel = await this.channelsService.createChannel(createChannelDto, this.socketUserMap.get(client.id));
		return { event: 'channelCreated', data: newChannel };
	}
}