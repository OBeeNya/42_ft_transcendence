import { User } from '@prisma/client';
import { EditUserDto, QrcodeVerifyDto } from './dto';
import { UserService } from './user.service';
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
    uploadAvatar(file: any): any;
    qrcode(name: any): unknown;
    verifyCode(elements: QrcodeVerifyDto): unknown;
}
