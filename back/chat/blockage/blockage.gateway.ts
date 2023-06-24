// import { ConnectedSocket, MessageBody,
// 		 SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
// import { BaseGateway } from "chat/base.gateway";
// import { PrismaService } from "prisma_module/prisma.service";
// import { Socket } from "socket.io";
// import { BlockageDto } from "./blockage.dto";
// import { BlockageService } from "./blockage.service";

// @WebSocketGateway({cors: {origin: "*"}})
// export class BlockageGateway extends BaseGateway
// {
// 	constructor(private blockageService: BlockageService, private prisma: PrismaService)
// 	{
//  	  super();
// 	}

// 	@SubscribeMessage('blockUser')
// 	async handleBlockUser(@MessageBody() data: BlockageDto, @ConnectedSocket() client: Socket)
// 	{
// 		console.log(`Attempting to block user: ${data.blockedId} by user: ${data.blockerId}`);

// 		// Vérifie si l'utilisateur à bloquer existe
// 		const userToBlock = await this.prisma.user.findUnique({where: {id: data.blockedId}});

// 		if (!userToBlock)
// 		{
// 			client.emit('error', {message: 'The user you are trying to block does not exist.'});
// 			return;
// 		}

// 		// Vérifie si l'utilisateur est déjà bloqué
// 		if (await this.blockageService.isUserBlocked(data))
// 		{
// 			client.emit('error', {message: 'You have already blocked this user.'});
// 			return;
// 		}

// 		try
// 		{
// 			await this.blockageService.blockUser(data);
// 			console.log(`User ${data.blockedId} has been blocked by ${data.blockerId}`);
// 			client.emit('userBlocked', {blockerId: data.blockerId, blockedId: data.blockedId});
// 		}
// 		catch (error)
// 		{
// 			console.error('Error while blocking user:', error);
// 			client.emit('error', {message: 'There was an error blocking the user.',
// 								  error: error.message});
// 		}
// 	}
// }
