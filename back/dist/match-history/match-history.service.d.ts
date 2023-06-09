import { PrismaService } from '../prisma_module/prisma.service';
import { MatchHistory } from '@prisma/client';
import { CreateMatchDto } from './dto';
import { User } from '@prisma/client';
export declare class MatchHistoryService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<MatchHistory[]>;
    findByUserId(idToSearch: string): Promise<MatchHistory[]>;
    findByUserName(nameToSearch: string): Promise<MatchHistory[]>;
    create(dto: CreateMatchDto, user: User): Promise<void>;
}
