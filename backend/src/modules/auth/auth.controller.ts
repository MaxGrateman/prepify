import { Body, Controller, Post } from "@nestjs/common";
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() dto: RegisterDTO) {
        return this.authService.register(dto)
    }

    @Post('login')
    login(@Body() dto: LoginDTO) {
        return this.authService.login(dto)
    }
}