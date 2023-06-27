import { WebSocketGateway } from "@nestjs/websockets";
import { BaseGateway } from "chat/base.gateway";
import { PrismaService } from "prisma_module/prisma.service";

@WebSocketGateway({cors: {origin: "*"}})
export class Channels2Gateway extends BaseGateway
{
	constructor(private prisma: PrismaService)
	{
		super();
	}

	
}