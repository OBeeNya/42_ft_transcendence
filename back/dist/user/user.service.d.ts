import { PrismaService } from '../prisma_module/prisma.service';
import { EditUserDto, Create42UserDto } from './dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").User[]>;
    findOneById(id: string): Promise<import(".prisma/client").User>;
    findOneByName(name: string): Promise<import(".prisma/client").User>;
    editUser(userId: number, dto: EditUserDto): Promise<any>;
    deleteUserById(id: string): Promise<{
        deletedUsers: number;
        nbUsers: number;
    }>;
    deleteMe(name: string): Promise<{
        deletedUsers: number;
        nbUsers: number;
    }>;
    create42User(dto: Create42UserDto): Promise<import(".prisma/client").User>;
    find42User(id: string): Promise<import(".prisma/client").User>;
    qrcode(name: string): Promise<string>;
}
