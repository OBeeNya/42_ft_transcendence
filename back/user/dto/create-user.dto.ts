import { IsString } from "class-validator";

export class Create42UserDto {

	@IsString()
	name: string;

	@IsString()
	hash: string;

	@IsString()
	oauthId: string;

}