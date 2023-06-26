import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../prisma_module/prisma.service"
import { DirectMessageDto } from './dto/directMessage.dto';
import { DirectMessage } from '@prisma/client';

@Injectable()
export class DirectMessageService
{
	constructor(private prisma: PrismaService) {}

	async create(data: DirectMessageDto): Promise<DirectMessage>
	{
		console.log('Creating direct message with data:', data);

		try
		{
			const createdMessage = await this.prisma.directMessage.create(
			{
				data:
				{
					senderId: data.senderId,
					receiverId: data.receiverId,
					content: data.content,
				},
			});

			console.log('Direct message created:', createdMessage);
			return (createdMessage);
		}
		catch (error)
		{
			console.error('Error while creating direct message:', error);
			throw error;
		}
	}

	async getConversation(senderId: number, receiverId: number): Promise<DirectMessage[]>
	{
		console.log(`Getting conversation between ${senderId} and ${receiverId}`);

		try
		{
			const messages = await this.prisma.directMessage.findMany(
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

			console.log(`Got ${messages.length} messages`);
			return (messages);
		}
		catch (error)
		{
			console.error('Error while getting conversation:', error);
			throw error;
		}
	}
}