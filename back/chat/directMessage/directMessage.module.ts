import { Module } from "@nestjs/common";
import { DirectMessageGateway } from "./directMessage.gateway";
import { DirectMessageService } from "./directMessage.service";
import { PrismaService } from "../../prisma_module/prisma.service";

@Module(
{
	providers: [DirectMessageGateway, DirectMessageService, PrismaService]
})

export class DirectMessageModule {}
