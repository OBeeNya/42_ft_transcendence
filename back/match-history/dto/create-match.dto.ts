import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateMatchDto {

	@IsString()
	opponentName: string;
	
	@IsNumber()
	ladder: number;

	@IsBoolean()
	won: boolean;

}
