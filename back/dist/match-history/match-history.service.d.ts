import { PrismaService } from '../prisma_module/prisma.service';
import { CreateMatchDto } from './dto';
import { User } from '@prisma/client';
export declare class MatchHistoryService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): unknown;
    findByUserId(idToSearch: string): unknown;
    findByUserName(nameToSearch: string): unknown;
    create(dto: CreateMatchDto, user: User): any;
}
