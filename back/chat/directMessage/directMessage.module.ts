import { Module } from "@nestjs/common";
import { DirectMessageService } from "../directMessage/directMessage.service";
import { PrismaService } from "../../prisma_module/prisma.service";
import { DirectMessageGateway } from "./directMessage.gateway";
// import { BlockageService } from "../blockage/blockage.service";

@Module(
{
	providers: [DirectMessageGateway, DirectMessageService/*, BlockageService*/, PrismaService],
	exports: [DirectMessageService],
})

export class DirectMessageModule {}