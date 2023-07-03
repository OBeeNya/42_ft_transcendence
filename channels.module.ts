import { Module } from "@nestjs/common";
import { ChannelsGateway } from "./back/chat/channels/channels.gateway";
import { PrismaService } from "prisma_module/prisma.service";
import { ChannelsService } from "./back/chat/channels/channels.service";

@Module(
{
	providers: [ChannelsGateway, ChannelsService ,PrismaService],
	exports: [ChannelsService],
})
	
export class ChannelsModule {}
