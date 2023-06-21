import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../prisma_module/prisma.service"
import { DirectMessageDto } from './directMessage.dto';
import { DirectMessage, UserBlock } from '@prisma/client';
import { BlockageDto } from './blockage.dto';

@Injectable()
export class DirectMessageService
{
	constructor(private prisma: PrismaService) {}

	// -------------------------------------------DM-------------------------------------------//

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

			return (messages);
		}
		catch (error)
		{
			console.error('Error while getting conversation:', error);
			throw error;
		}
	}

	// -------------------------------------------BLOCAGE-------------------------------------------//

	// créer un nouvel enregistrement dans la table UserBlock de Prisma avec blockerId et blockedId
	async blockUser(data: BlockageDto): Promise<UserBlock>
	{
		return this.prisma.userBlock.create(
		{
			data:
			{
				blockerId: data.blockerId,
				blockedId: data.blockedId
			}
		});
	}

	async isUserBlocked(blockerId: number, blockedId: number)
	{
		console.log(`Checking if user ${blockerId} has blocked user ${blockedId}`);

		const block = await this.prisma.userBlock.findUnique(
		{
			where:
			{
				userId_blockedId:
				{
					userId: blockerId,
					blockedId: blockedId
				}
			}
		});

		if (block !== null)
			console.log(`User ${blockerId} has blocked user ${blockedId}`);
		else 
			console.log(`User ${blockerId} has not blocked user ${blockedId}`);

		return (block !== null);
	}
}
