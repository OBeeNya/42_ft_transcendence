// import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DirectMessageDto
{
	senderId: number;
	receiverId: number;
	content: string;
}

// export class DirectMessageDto
// {
// 	@IsNotEmpty()
// 	@IsNumber()
// 	senderId: number;

// 	@IsNotEmpty()
// 	@IsNumber()
// 	receiverId: number;

// 	@IsNotEmpty()
// 	@IsString()
// 	content: string;
// }
