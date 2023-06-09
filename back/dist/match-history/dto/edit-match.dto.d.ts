import { User } from '@prisma/client';
export declare class CreateMatchDto {
    user?: User;
    userId?: number;
    userName: string;
    opponentName: string;
    ladder: number;
    won: boolean;
}
