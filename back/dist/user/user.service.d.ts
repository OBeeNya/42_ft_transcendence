import { PrismaService } from '../prisma_module/prisma.service';
import { EditUserDto, Create42UserDto } from './dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
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
        ladders: number[];
        wons: boolean[];
        gameDates: string[];
        exp: number;
        playing: boolean;
    }, unknown, never> & {})[]>;
    findOneById(id: string): Promise<import("@prisma/client/runtime").GetResult<{
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
        ladders: number[];
        wons: boolean[];
        gameDates: string[];
        exp: number;
        playing: boolean;
    }, unknown, never> & {}>;
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
        ladders: number[];
        wons: boolean[];
        gameDates: string[];
        exp: number;
        playing: boolean;
    }, unknown, never> & {}>;
    editUser(userId: number, dto: EditUserDto): Promise<any>;
    deleteUserById(id: string): Promise<{
        deletedUsers: number;
        nbUsers: number;
    }>;
    deleteMe(name: string): Promise<{
        deletedUsers: number;
        nbUsers: number;
    }>;
    create42User(dto: Create42UserDto): Promise<import("@prisma/client/runtime").GetResult<{
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
        ladders: number[];
        wons: boolean[];
        gameDates: string[];
        exp: number;
        playing: boolean;
    }, unknown, never> & {}>;
    find42User(id: string): Promise<import("@prisma/client/runtime").GetResult<{
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
        ladders: number[];
        wons: boolean[];
        gameDates: string[];
        exp: number;
        playing: boolean;
    }, unknown, never> & {}>;
    qrcode(name: string): Promise<string>;
}
