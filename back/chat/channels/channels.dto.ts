import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateChannelDto {
    
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}

export class JoinRoomDto {
    roomId: string;
}
  
export class MessageDto {
    roomId: string;
    message: string;
}