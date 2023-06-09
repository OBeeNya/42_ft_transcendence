import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma_module/prisma.service';
import { User, DirectMessage } from '@prisma/client';
import { EditUserDto, Create42UserDto} from './dto';
// import { CreateDirectMessageDto } from './dto/create-direct-message.dto';
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

	// async sendDirectMessage(sender: User, receiverId: number, createDMdto: CreateDirectMessageDto): Promise<DirectMessage>
	// {
	// 	const newDirectMessage = await this.prisma.directMessage.create(
	// 	{
	// 		data:
	// 		{
	// 			senderId: sender.id,
	// 			receiverId: receiverId,
	// 			content: createDMdto.content,
	// 		},
	// 	});

	// 	return (newDirectMessage);
	// }

	// async getDirectMessages(user: User, receiverId: number): Promise<DirectMessage[]> 
	// {	  
	// 	const directMessages = await this.prisma.directMessage.findMany( // findMany() trouve tous les dms entre l'user connecté et le destinataire
	// 	{
	// 		where:
	// 		{
	// 			AND: 
	// 			[{
	// 				OR:
	// 				[{
	// 					senderId: user.id,
	// 					receiverId: receiverId,
	// 				 },
	// 				 {
	// 					senderId: receiverId,
	// 					receiverId: user.id,
	// 				 },],
	// 			 },],
	// 		},
	// 	  orderBy:
	// 	  {
	// 		createdAt: 'asc', // trie les dms par ordre de création du plus ancien au plus récent
	// 	  },
	// 	});

	// 	return (directMessages);
	// }
}
