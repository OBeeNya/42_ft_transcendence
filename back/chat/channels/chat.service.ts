import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma_module/prisma.service';
import { CreateChannelDto } from './chat.dto';

@Injectable()
export class ChatService
{
	constructor(private prisma: PrismaService) {} // injection de PrismaService dans ChatService --> permet d'interagir avec la db

	async createChannel(dto: CreateChannelDto) {
			return (this.prisma.channel.create({
				data: {
					name: dto.channelName,
				},
			}));
	}

	async getChannel()
	{
		const channels = await this.prisma.channel.findMany({select: { name: true, }});
		const channelNames = channels.map(channel => channel.name);
		return channelNames;
	}

	async setChatPassword(userId: number, chatId: number, password: string)
	{
		const chat = await this.prisma.chat.findUnique({ where:{id: chatId} });

		if (!chat)
			throw new BadRequestException(`Chat with id ${chatId} does not exist`);

		const owner = await this.prisma.userChat.findFirst(
		{
			where: {chatId, isOwner: true},
		});

		if (owner.userId !== userId)
			throw new ForbiddenException(`Only the owner can set the password for chat with id ${chatId}`);

		await this.prisma.chat.update(
		{
			where: {id: chatId},
			data: {password},
		});
	}

	async joinChannel(userId: number, chatId: number, password?: string)
	{
		// Vérifie si l'utilisateur existe
		const user = await this.prisma.user.findUnique({ where: {id: userId} });

		if (!user)
			throw new BadRequestException(`User with id ${userId} does not exist`);

		// Vérifie si le channel existe
		const chat = await this.prisma.chat.findUnique({ where: {id: chatId} });

		if (!chat)
			throw new BadRequestException(`Chat with id ${chatId} does not exist`);

		// Vérifie si l'utilisateur est bloqué
		const blockedUser = await this.prisma.userBlock.findUnique(
		{
			where: { userId_blockedId: {userId: userId, blockedId: chatId} },
		});

		if (blockedUser)
			throw new ForbiddenException(`User with id ${userId} is blocked from chat with id ${chatId}`);

		// Vérifie si l'utilisateur est déjà membre du chat
		const userChat = await this.prisma.userChat.findUnique({ where: {userId_chatId: {userId, chatId}} });

		if (userChat)
			throw new BadRequestException(`User with id ${userId} is already a member of chat with id ${chatId}`);

		// Si le channel est privé, seul le propriétaire peut ajouter de nouveaux membres
		if (chat.type === 'PRIVATE')
		{
			const owner = await this.prisma.userChat.findFirst(
			{
				where: {chatId, isOwner: true},
			});

			if (owner.userId !== userId)
				throw new ForbiddenException(`Only the owner can add new members to a private chat`);
		}

		// Si le channel est protégé par un mot de passe, on vérifie s'il est correct
		if (chat.type === 'PASSWORD' && chat.password !== password)
			throw new ForbiddenException(`Incorrect password for chat with id ${chatId}`);

		const newUserChat = await this.prisma.userChat.create(
		{
			data:
			{
				userId,
				chatId,
				isOwner: false,			// L'utilisateur n'est pas propriétaire du chat par défaut
				isBlocked: false,		// L'utilisateur n'est pas bloqué par défaut
				permissions: 'default',	// Permissions par défaut
			},
		});

		return (newUserChat);
	}
}
