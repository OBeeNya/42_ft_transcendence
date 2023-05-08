import { PrismaService } from '../prisma_module/prisma.service';
import { EditUserDto } from './dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").User[]>;
    findOneById(id: string): Promise<import(".prisma/client").User>;
    findOneByName(name: string): Promise<import(".prisma/client").User>;
    editUser(userId: number, dto: EditUserDto): Promise<import(".prisma/client").User>;
    deleteUserById(id: string): Promise<{
        deletedUsers: number;
        nbUsers: number;
    }>;
    deleteMe(name: string): Promise<{
        deletedUsers: number;
        nbUsers: number;
    }>;
    createIntraUser(id: string): Promise<import(".prisma/client").User>;
    findIntraUser(id: string): Promise<import(".prisma/client").User>;
}
