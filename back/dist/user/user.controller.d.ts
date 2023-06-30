import { User } from '@prisma/client';
import { EditUserDto, QrcodeVerifyDto } from './dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        hash: string;
        wins: number;
        losses: number;
        ladder_level: number;
        oauthId: string;
        connected: boolean;
        isPlaying: boolean;
        tfa: boolean;
        tfa_key: string;
    }, unknown, never> & {})[]>;
    findOne(name: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        hash: string;
        wins: number;
        losses: number;
        ladder_level: number;
        oauthId: string;
        connected: boolean;
        isPlaying: boolean;
        tfa: boolean;
        tfa_key: string;
    }, unknown, never> & {}>;
    getMe(user: User): import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        hash: string;
        wins: number;
        losses: number;
        ladder_level: number;
        oauthId: string;
        connected: boolean;
        isPlaying: boolean;
        tfa: boolean;
        tfa_key: string;
    }, unknown, never> & {};
    findOneByName(name: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        hash: string;
        wins: number;
        losses: number;
        ladder_level: number;
        oauthId: string;
        connected: boolean;
        isPlaying: boolean;
        tfa: boolean;
        tfa_key: string;
    }, unknown, never> & {}>;
    findOneById(id: string): Promise<void>;
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
    qrcode(name: any): Promise<string>;
    verifyCode(elements: QrcodeVerifyDto): Promise<any>;
}
