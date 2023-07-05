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
		// console.log(`InviteToPong instance: ${this}`);
	}

	@SubscribeMessage('sendPongInvitation')
	async handleSendInvitation(@MessageBody() data: InviteToPongDto,
							   @ConnectedSocket() client: Socket)
	{
		try
		{
			const newInvitation = await this.inviteToPongService.createInvitation(data);
			client.emit('pongInvitationSent', newInvitation);
		}
		catch (error)
		{
			client.emit('error', {message: 'There was an error sending your invitation.', error: error.message});
		}
	}

	@SubscribeMessage('acceptPongInvitation')
	async handleAcceptInvitation(@MessageBody() data: {id: number},
								 @ConnectedSocket() client: Socket)
	{
		try
		{
			const updatedInvitation = await this.inviteToPongService.acceptInvitation(data.id);
			client.emit('pongInvitationAccepted', updatedInvitation);
		}
		catch (error)
		{
			client.emit('error', {message: 'There was an error accepting the invitation.', error: error.message});
		}
	}

	@SubscribeMessage('refusePongInvitation')
	async handleRefuseInvitation(@MessageBody() data: {id: number},
								 @ConnectedSocket() client: Socket)
	{
		try
		{
			const updatedInvitation = await this.inviteToPongService.refuseInvitation(data.id);
			client.emit('pongInvitationRefused', updatedInvitation);
		}
		catch (error)
		{
			client.emit('error', {message: 'There was an error refusing the invitation.', error: error.message});
		}
	}

	@SubscribeMessage('getPongInvitations')
	async handleGetInvitations(@MessageBody() data: {invitedId: number},
							   @ConnectedSocket() client: Socket)
	{
		try
		{
			const invitations = await this.inviteToPongService.getInvitations(data.invitedId);
			client.emit('pongInvitations', invitations);
		}
		catch (error)
		{
			client.emit('error', {message: 'There was an error getting your invitations.', error: error.message});
		}
	}
}
