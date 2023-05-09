import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class AuthDto {

	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	password: string;

	@IsOptional()
	@IsString()
	oautid?: string;
	
}
