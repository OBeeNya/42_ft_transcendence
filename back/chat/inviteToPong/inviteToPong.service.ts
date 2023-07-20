import { Injectable } from "@nestjs/common";
import { PongInvitation } from "@prisma/client";
import { PrismaService } from "prisma_module/prisma.service";
import { InviteToPongDto } from "./inviteToPong.dto";

@Injectable()
export class InviteToPongService
{
	constructor(private prisma: PrismaService) {}

	async createInvitation(data: InviteToPongDto): Promise<PongInvitation>
	{
		if (data.userId === data.invitedId) 
			throw new Error("User cannot invite themselves to a game");

		const block = await this.prisma.userBlock.findFirst(
		{
			where:
			{
				OR:
				[
					{ userId: data.userId, blockedId: data.invitedId },
					{ userId: data.invitedId, blockedId: data.userId }
				]
			}
		});

		if (block)
			throw new Error("Blocked users cannot invite each other to a game");

		const invitation = await this.prisma.pongInvitation.create(
		{
			data:
			{
				userId: data.userId,
				invitedId: data.invitedId,
				expiresAt: new Date(Date.now() + 15 * 1000)
			},
		});

		return (invitation);
	}

	async acceptInvitation(id: number): Promise<PongInvitation>
	{
		const invitation = await this.prisma.pongInvitation.findUnique({where: {id}});

		if (new Date() > invitation.expiresAt)
			throw new Error('This invitation has expired.');

		if (invitation.accepted)
			throw new Error('This invitation has already been accepted.');

		return (this.prisma.pongInvitation.update(
		{
			where: {id: id},
			data: {accepted: true},
		}));
	}

	async refuseInvitation(id: number): Promise<PongInvitation>
	{
		const invitation = await this.prisma.pongInvitation.findUnique({where: {id}});

		if (invitation.accepted)
			throw new Error('This invitation has already been accepted.');

		if (invitation.refused)
			throw new Error('This invitation has already been refused.');

		return (this.prisma.pongInvitation.update(
		{
			where: {id: id},
			data: {refused: true},
		}));
	}
}