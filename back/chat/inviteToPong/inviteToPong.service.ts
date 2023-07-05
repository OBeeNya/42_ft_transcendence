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

		const existingInvitation = await this.prisma.pongInvitation.findFirst(
		{
			where:
			{
				userId: data.userId,
				invitedId: data.invitedId
			}
		});

		if (existingInvitation)
			throw new Error('Invitation already exists.');

		const invitation = await this.prisma.pongInvitation.create(
		{
			data:
			{
				userId: data.userId,
				invitedId: data.invitedId
			},
		});

		return (invitation);
	}

	async acceptInvitation(id: number): Promise<PongInvitation>
	{
		const invitation = await this.prisma.pongInvitation.findUnique({where: {id}});

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

	async getInvitations(invitedId: number): Promise<PongInvitation[]>
	{
		return (this.prisma.pongInvitation.findMany(
		{
			where:
			{
				invitedId: invitedId
			},

			include:
			{
				user: true
			}
		}));
	}
}
