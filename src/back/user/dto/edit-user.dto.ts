import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class EditUserDto {

	@IsString()
	@IsOptional()
	name?: string;

	@IsArray()
	@IsOptional()
	friends?: string[];
	
	@IsNumber()
	@IsOptional()
	wins?: number;
	
	@IsNumber()
	@IsOptional()
	losses?: number;
	
	@IsNumber()
	@IsOptional()
	ladder_level?: number;

}
