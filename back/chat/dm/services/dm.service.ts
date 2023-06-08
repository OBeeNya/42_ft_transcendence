import { Injectable } from '@nestjs/common';
import { DirectMessage } from '@prisma/client';
import { PrismaService } from "../../../prisma_module/prisma.service"

@Injectable()
export class DirectMessageService
{
	constructor(private prisma: PrismaService) {}

	async createDM(data: {senderId: number, receiverId: number, content: string})
	{
		const newDM = await this.prisma.directMessage.create(
		{
			data:
			{
				senderId: data.senderId,
				receiverId: data.receiverId,
				content: data.content
			}
		});

		return (newDM);
	}

	async getDMs(senderId: number, receiverId: number): Promise<DirectMessage[]>
	{
		return this.prisma.directMessage.findMany(
		{
			where:
			{
				OR: [
				{
					senderId: senderId,
					receiverId: receiverId,
				},
				{
					senderId: receiverId,
					receiverId: senderId,
				},
				],
			},
			orderBy:
			{
				createdAt: 'asc',
			},
		});
	}
}
