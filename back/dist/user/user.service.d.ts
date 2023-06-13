import { PrismaService } from '../prisma_module/prisma.service';
<<<<<<< HEAD
import { User } from '@prisma/client';
=======
>>>>>>> d18ca83a021e8566cf46a2820079e1b7ef2af7c1
import { EditUserDto, Create42UserDto } from './dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
<<<<<<< HEAD
    findAll(): import(".prisma/client").Prisma.PrismaPromise<User[]>;
    findOneById(id: string): Promise<User>;
    findOneByName(name: string): Promise<User>;
=======
    findAll(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").User[]>;
    findOneById(id: string): Promise<import(".prisma/client").User>;
    findOneByName(name: string): Promise<import(".prisma/client").User>;
>>>>>>> d18ca83a021e8566cf46a2820079e1b7ef2af7c1
    editUser(userId: number, dto: EditUserDto): Promise<any>;
    deleteUserById(id: string): Promise<{
        deletedUsers: number;
        nbUsers: number;
    }>;
    deleteMe(name: string): Promise<{
        deletedUsers: number;
        nbUsers: number;
    }>;
<<<<<<< HEAD
    create42User(dto: Create42UserDto): Promise<User>;
    find42User(id: string): Promise<User>;
=======
    create42User(dto: Create42UserDto): Promise<import(".prisma/client").User>;
    find42User(id: string): Promise<import(".prisma/client").User>;
>>>>>>> d18ca83a021e8566cf46a2820079e1b7ef2af7c1
    qrcode(name: string): Promise<string>;
}
