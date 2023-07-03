export interface UserInfos
{
	id: number;
	name: string;
	friends: [];
	wins: number;
	losses: number;
	ladder_level: number;
	connected: boolean;
	isPlaying: boolean;
	tfa: boolean;
	tfa_key: string;
	status: string;
	avatar_url: string;
	exp: number;
	ladders: number[];
	wons: boolean[];
	gameDates: string[];
}

export {};
