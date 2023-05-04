import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
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
				id: user.id
			}
		});
		return (matches);
	}

	async findByUserName(nameToSearch: string) {
		const user = await this.prisma.user.findUniqueOrThrow({
			where: { 
				name: nameToSearch, 
			}
		});

		const matches = await this.prisma.matchHistory.findMany({
			where: {
				userName: user.name
			}
		});
		return (matches);
	}

	async create(dto: CreateMatchDto, user: User) {
		const match = await this.prisma.matchHistory.create({
			data: {
				userName: user.name, 
				opponentName: dto.opponentName,
				ladder: dto.ladder,
				winner: dto.winner,
				user: { connect: { id: user.id } }
			}
		})
		return (match);	
	}
}

