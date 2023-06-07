import { User } from '@prisma/client';
import { EditUserDto, QrcodeVerifyDto } from './dto';
import { UserService } from './user.service';
import { CreateDirectMessageDto } from './dto/create-direct-message.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(): any;
    findOne(name: string): unknown;
    getMe(user: User): User;
    findOneByName(name: string): unknown;
    findOneById(id: string): unknown;
    editUser(userId: number, dto: EditUserDto): unknown;
    deleteUserById(id: string): unknown;
    deleteMe(user: User): unknown;
    sendDirectMessage(user: User, receiverId: number, createDMdto: CreateDirectMessageDto): Promise<DirectMessage>;
    getDirectMessages(user: User, receiverId: number): Promise<{}>;
    uploadAvatar(file: any): any;
    qrcode(name: any): unknown;
    verifyCode(elements: QrcodeVerifyDto): unknown;
}
