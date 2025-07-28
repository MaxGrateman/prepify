import { IsNumber, IsOptional, IsString, IsUrl } from "class-validator";


export class UpdatedProfileDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    age?: number;

    @IsOptional()
    @IsString()
    country?: string

    @IsOptional()
    @IsString()
    email_verified_at?: string;
    
    @IsOptional()
    @IsUrl({ require_protocol: false }, { message: 'Invalid image path' })
    image_path?: string;
    
    @IsOptional()
    @IsString()
    level?: string;

    @IsOptional()
    @IsString()
    about?: string;

    @IsOptional()
    @IsString()
    stack?: string;
}