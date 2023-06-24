import { PrismaService } from '../prisma_module/prisma.service';
import { User, UserBlock } from '@prisma/client';
import { EditUserDto, Create42UserDto } from './dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<User[]>;
    findOneById(id: string): Promise<void>;
    findOneByName(name: string): Promise<User>;
    editUser(userId: number, dto: EditUserDto): Promise<any>;
    deleteUserById(id: string): Promise<{
        deletedUsers: number;
        nbUsers: number;
    }>;
    deleteMe(name: string): Promise<{
        deletedUsers: number;
        nbUsers: number;
    }>;
    create42User(dto: Create42UserDto): Promise<User>;
    find42User(id: string): Promise<User>;
    qrcode(name: string): Promise<string>;
    getBlockedUsers(userId: number): Promise<User[]>;
    getBlockedByUsers(userId: number): Promise<User[]>;
    blockUser(blockerId: number, blockedId: number): Promise<UserBlock>;
}
