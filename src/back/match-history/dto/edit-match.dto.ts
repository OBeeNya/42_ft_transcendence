import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { User } from '@prisma/client';

export class CreateMatchDto {

	@IsOptional()
	user?: User;
	 
	@IsString()
	userName: string;

	@IsNumber()
	userId: number;
	
	@IsString()
	opponentName: string;
	
	@IsNumber()
	ladder: number;

	@IsNumber()
	winner: number;

}
