import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma_module/prisma.service';
import { User, DirectMessage } from '@prisma/client';
import { EditUserDto, Create42UserDto} from './dto';
import * as speakeasy from 'speakeasy';

@Injectable()
export class UserService
{
	constructor(private prisma: PrismaService) {}

	findAll() {
		return this.prisma.user.findMany();
	}

	async findOneById(id: string) {
		const user = await this.prisma.user.findUniqueOrThrow({
			where: {
				id: Number(id),
			}
		});
		return (user);
	}

	async findOneByName(name: string) {
		return (await this.prisma.user.findFirst({
			where: {
				name: name,
			}
		}));
	}

	async editUser(userId: number, dto: EditUserDto) {
		let user;
		if (dto.name != '') {
			user = await this.prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					// ...dto,
					name: dto.name,
				},
			});
		}
		if (dto.connected !== undefined) {
			user = await this.prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					connected: dto.connected,
				},
			});
		}
		if (dto.tfa !== undefined) {
			user = await this.prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					tfa: dto.tfa,
				},
			});
		}
		delete user.hash;
		return (user);
	}

	// uer deleteMany?
	async deleteUserById(id: string) {
		const deleteUser = await this.prisma.user.delete({
			where: {
				id: Number(id),
			},
			select: {	//devrait retourner le name du user supprimé, ne fonctionne pas
				name: true,
			}
		})
		const nbOfUsersAfterDelete = await this.prisma.user.count();
		return { deletedUsers: 1, nbUsers: Number(nbOfUsersAfterDelete) };
	}

	async deleteMe(name: string) {
		const deleteUser = await this.prisma.user.delete({
			where: {
				name: name,
			},
			select: {	//devrait retourner le name du user supprimé, ne fonctionne pas
				name: true,
			}
		})
		const nbOfUsersAfterDelete = await this.prisma.user.count();
		return { deletedUsers: 1, nbUsers: Number(nbOfUsersAfterDelete) };
	}

	async create42User(dto: Create42UserDto) {
		return (await this.prisma.user.create({
			data: {
				name: dto.name,
				oauthId: dto.oauthId,
				hash: dto.hash,
				tfa_key: speakeasy.generateSecret({ length: 10 }).base32,
				// avatar_url: 'default_url'
			},
		}));
	}

	async find42User(id: string) {
		return (await this.prisma.user.findFirst({
			where: {
				oauthId: id,
			},
		}));
	}

	async qrcode(name: string) {
		const user = await this.prisma.user.findFirst({
			where: {
				name: name,
			}
		});
		return (user.tfa_key);
	}

	// créer un nouvel enregistrement dans la table UserBlock de Prisma avec blockerId et blockedId
	async blockUser(blockerId: number, blockedId: number)
	{
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

		return (block !== null);
	}
}
