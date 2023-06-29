import { ConnectedSocket, MessageBody,
		 SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import { BaseGateway } from "chat/base.gateway";
import { PrismaService } from "prisma_module/prisma.service";
import { Socket } from "socket.io";
import { BlockageDto } from "./blockage.dto";
import { BlockageService } from "./blockage.service";

@WebSocketGateway({cors: {origin: "*"}})
export class BlockageGateway extends BaseGateway
{
	constructor(private blockageService: BlockageService,
				private prisma: PrismaService)
	{
		super();
		console.log(`Blockage instance: ${this}`);
	}

	@SubscribeMessage('blockUser')
	async handleBlockUser(@MessageBody() data: BlockageDto,
						  @ConnectedSocket() client: Socket)
	{
		console.log(`${data.userId} attempting to block ${data.blockedId}`);

		try
		{
			await this.blockageService.blockUser(data);
			console.log(`User ${data.blockedId} has been blocked by ${data.userId}`);
			client.emit('userBlocked', {userId: data.userId, blockedId: data.blockedId});
		}
		catch (error)
		{
			console.error('Error while blocking user:', error);
			client.emit('error', {message: 'There was an error blocking the user.',
								  error: error.message});
		}
	}
}