import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma_module/prisma.service';
import { MatchHistory } from '@prisma/client';
import { CreateMatchDto } from './dto';
import { User } from '@prisma/client';


@Injectable()
export class MatchHistoryService {

	constructor(private prisma: PrismaService) {}

	async findAll() {
		const matches = await this.prisma.matchHistory.findMany();
		return (matches);
	}

	async findByUserId(idToSearch: string) {
		const user = await this.prisma.user.findUniqueOrThrow({
			where: { 
				id: Number(idToSearch), 
			}
		});

		const matches = await this.prisma.matchHistory.findMany({
			where: {
				userId: user.id
			}
		});
		return (matches);
	}

	async findByUserName(nameToSearch: string) {
		const userCurrent = await this.prisma.user.findUniqueOrThrow({
			where: { 
				name: nameToSearch, 
			}
		});

		const matches = await this.prisma.matchHistory.findMany({
			where: {
				userId: userCurrent.id
			}
		});
		return (matches);
	}

	async create(dto: CreateMatchDto, user: User) {
		// const match = await this.prisma.matchHistory.create({
		// 	data: {
		// 		user: { connect: { id: user.id } },
		// 		userId: user.id,
		// 		userName: dto.userName,
		// 		opponentName: dto.opponentName,
		// 		ladder: dto.ladder,
		// 		won: dto.won,
		// 	}
		// });
		// return (match);
	}
}
