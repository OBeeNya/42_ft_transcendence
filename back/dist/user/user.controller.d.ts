import { User } from '@prisma/client';
import { EditUserDto, QrcodeVerifyDto } from './dto';
import { UserService } from './user.service';
import { CreateDirectMessageDto } from './dto/create-direct-message.dto';
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
    sendDirectMessage(user: User, receiverId: number, createDMdto: CreateDirectMessageDto): Promise<import(".prisma/client").DirectMessage>;
    getDirectMessages(user: User, receiverId: number): Promise<import(".prisma/client").DirectMessage[]>;
    uploadAvatar(file: any): any;
    qrcode(name: any): Promise<string>;
    verifyCode(elements: QrcodeVerifyDto): Promise<any>;
}
