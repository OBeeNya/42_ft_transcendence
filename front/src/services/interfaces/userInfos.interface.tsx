export interface UserInfos {
    id: number;
    name: string;
    friends: [];
    wins: number;
    losses: number;
    ladder_level: number;
    email: string;
    connected: boolean;
    tfa: boolean;
    tfa_key: string;
}
  
export {};
