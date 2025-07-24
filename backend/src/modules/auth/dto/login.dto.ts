import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
    @IsNotEmpty()
    @ApiProperty()
    @IsEmail()
    email: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    password: string
}