import { PrismaService } from '../prisma_module/prisma.service';
import { EditUserDto } from './dto';
import { User } from '@prisma/client';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<User[]>;
    findOneById(id: string): Promise<User>;
    findOneByName(name: string): Promise<User>;
    editUser(userId: number, dto: EditUserDto): Promise<User>;
    deleteUserById(id: string): Promise<{
        deletedUsers: number;
        nbUsers: number;
    }>;
    deleteMe(name: string): Promise<{
        deletedUsers: number;
        nbUsers: number;
    }>;
}
