import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<User[]>;
    findOne(name: string): Promise<User>;
    getMe(user: User): User;
    findOneByName(name: string): Promise<User>;
    findOneById(id: string): Promise<User>;
    editUser(userId: number, dto: EditUserDto): Promise<any>;
    deleteUserById(id: string): Promise<{
        deletedUsers: number;
        nbUsers: number;
    }>;
    deleteMe(user: User): Promise<{
        deletedUsers: number;
        nbUsers: number;
    }>;
    uploadAvatar(file: any): any;
}
