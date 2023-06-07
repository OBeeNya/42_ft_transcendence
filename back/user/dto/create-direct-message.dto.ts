import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDirectMessageDto
{
	@IsNotEmpty()
	@IsString()
	content: string;
}
