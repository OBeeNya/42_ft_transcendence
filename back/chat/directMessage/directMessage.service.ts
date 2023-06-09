import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../prisma_module/prisma.service"
import { DirectMessageDto } from './directMessage.dto';
import { DirectMessage } from '@prisma/client';

@Injectable()
export class DirectMessageService
{
	constructor(private prisma: PrismaService) {}

	async create(data: DirectMessageDto): Promise<DirectMessage>
	{
		return this.prisma.directMessage.create(
		{
			data:
			{
				senderId: data.senderId,
				receiverId: data.receiverId,
				content: data.content,
			},
		});
	}

	async getConversation(senderId: number, receiverId: number): Promise<DirectMessage[]>
	{
		return this.prisma.directMessage.findMany(
		{
			where:
			{
				OR: [
					{ senderId: senderId, receiverId: receiverId },
					{ senderId: receiverId, receiverId: senderId }
				]
			},
			orderBy:
			{
				createdAt: 'asc',
			}
		});
	}
}
