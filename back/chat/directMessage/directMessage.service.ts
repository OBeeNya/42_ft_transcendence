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

	// créer un nouvel enregistrement dans la table UserBlock de Prisma avec blockerId et blockedId
	async blockUser(blockerId: number, blockedId: number)
	{
		console.log(`Blocking user ${blockedId} for user ${blockerId}`);

		return this.prisma.userBlock.create(
		{
			data:
			{
				userId: blockerId,
				blockedId: blockedId
			}
		});
	}

	async unblockUser(blockerId: number, blockedId: number)
	{
		return this.prisma.userBlock.delete(
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
	}

	// userId_blockedId = contrainte composite
	// combine les deux colonnes userId et blockedId qui forment ensemble un id unique
	// pour voir s'il existe un enregistrement correspondant à la fois à userId et blockedId
	// renvoie true si l'utilisateur est bloqué, sinon false
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

	// Retourne une liste de tous les utilisateurs bloqués par un certain utilisateur
	async getBlockedUsers(userId: number)
	{
		const blockedUsers = await this.prisma.userBlock.findMany(
		{
			where:
			{
				userId: userId
			},
			select:
			{
				blockedId: true
			}
		});

		return (blockedUsers.map((user: {blockedId: number;}) => user.blockedId));
	}
}
