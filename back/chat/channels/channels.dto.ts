import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateChannelDto {
    
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}
