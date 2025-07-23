import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class RegisterDTO {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;

    @Matches('password')
    password_confirmation: string;
}