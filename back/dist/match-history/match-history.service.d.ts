import { PrismaService } from '../prisma_module/prisma.service';
import { CreateMatchDto } from './dto';
import { User } from '@prisma/client';
export declare class MatchHistoryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateMatchDto, user: User): Promise<void>;
}
