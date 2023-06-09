import { ConnectedSocket, MessageBody, SubscribeMessage,
		 WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { InviteToPongService } from "./inviteToPong.service";
import { InviteToPongDto } from "./inviteToPong.dto";
import { PrismaService } from "prisma_module/prisma.service";
import { BaseGateway } from "chat/base.gateway";

@WebSocketGateway({cors: {origin: "*"}})
export class InviteToPongGateway extends BaseGateway
{
	constructor(private inviteToPongService: InviteToPongService,
				private prisma: PrismaService)
	{
		super();
	}

	@SubscribeMessage('sendPongInvitation')
	async handleSendInvitation(@MessageBody() data: InviteToPongDto,
							   @ConnectedSocket() client: Socket)
	{
		try
		{
			console.log(`Invitation sent from user ${data.userId} to user ${data.invitedId}`);

			const newInvitation = await this.inviteToPongService.createInvitation(data);
			const invitedSocketId = this.userSocketMap.get(data.invitedId);

			if (invitedSocketId)
				this.server.to(invitedSocketId).emit('pongInvitationReceived', newInvitation);
		}
		catch (error)
		{
			console.error('Error while inviting to Pong:', error);
			client.emit('error', {message: 'There was an error sending your invitation.', error: error.message});
		}
	}

	@SubscribeMessage('getPongInvitations')
	async handleGetInvitations(@MessageBody() data: InviteToPongDto,
							   @ConnectedSocket() client: Socket)
	{
		try
		{
			console.log(`Getting invitations for user ${data.invitedId}`);

			const invitations = await this.inviteToPongService.getInvitations(data.invitedId);
			client.emit('pongInvitations', invitations);
		}
		catch (error)
		{
			client.emit('error', {message: 'There was an error getting your invitations.', error: error.message});
		}
	}
}
	// @SubscribeMessage('acceptPongInvitation')
	// async handleAcceptInvitation(@MessageBody() data: InviteToPongDto,
	// 							 @ConnectedSocket() client: Socket)
	// {
	// 	try
	// 	{
	// 		console.log(`User ${data.invitedId} accepted the invitation`);

	// 		const updatedInvitation = await this.inviteToPongService.acceptInvitation(data.invitedId);
	// 		client.emit('pongInvitationAccepted', updatedInvitation);
	// 	}
	// 	catch (error)
	// 	{
	// 		client.emit('error', {message: 'There was an error accepting the invitation.',
	// 							  error: error.message});
	// 	}
	// }

	// @SubscribeMessage('refusePongInvitation')
	// async handleRefuseInvitation(@MessageBody() data: InviteToPongDto,
	// 							 @ConnectedSocket() client: Socket)
	// {
	// 	try
	// 	{
	// 		console.log(`User ${data.invitedId} refused the invitation`);

	// 		const updatedInvitation = await this.inviteToPongService.refuseInvitation(data.invitedId);
	// 		client.emit('pongInvitationRefused', updatedInvitation);
	// 	}
	// 	catch (error)
	// 	{
	// 		client.emit('error', {message: 'There was an error refusing the invitation.', error: error.message});
	// 	}
	// }