import { Module } from "@nestjs/common";
import { DirectMessageGateway } from "./directMessage.gateway";
import { DirectMessageService } from "./directMessage.service";
import { PrismaService } from "../../prisma_module/prisma.service";
import { BlockageService } from "../blockage/blockage.service";

@Module(
{
	providers: [DirectMessageGateway, DirectMessageService, BlockageService, PrismaService]
})

export class DirectMessageModule {}
