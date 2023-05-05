import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { User } from '@prisma/client';

export class CreateMatchDto {

	@IsOptional()
	user?: User;
	
	@IsOptional()
	@IsNumber()
	userId?: number;
	 
	@IsString()
	userName: string;
	
	@IsString()
	opponentName: string;
	
	@IsNumber()
	ladder: number;

	@IsBoolean()
	won: boolean;

}
