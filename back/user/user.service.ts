import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma_module/prisma.service';
import { EditUserDto, Create42UserDto, UpdateAvatarDto } from './dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UserService {

	constructor(private prisma: PrismaService,
				private httpService: HttpService) {}

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
		if (dto.email != '') {
			user = await this.prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					email: dto.email,
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
				email: dto.email,
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

}
