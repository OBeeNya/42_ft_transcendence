import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { User } from '@prisma/client';

export class CreateMatchDto {

	@IsOptional()
	user?: User;
	 
	@IsString()
	userName: string;
	
	@IsString()
	opponentName: string;
	
	@IsNumber()
	ladder: number;

	@IsString()
	winner: string;

}
