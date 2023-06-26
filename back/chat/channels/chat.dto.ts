import { IsBoolean, IsNotEmpty, IsString } from "class-validator";


export class CreateChannelDto {
    @IsString()
    @IsNotEmpty()
    channelName : string;
}

