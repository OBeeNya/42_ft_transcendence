import { User } from '@prisma/client';
export declare class CreateMatchDto {
    user?: User;
    userName: string;
    opponentName: string;
    ladder: number;
    winner: string;
}
