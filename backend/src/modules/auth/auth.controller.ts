import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body(new ValidationPipe({ whitelist: true})) dto: RegisterDTO) {
        return this.authService.register(dto)
    }

    @Post('login')
    login(@Body() dto: LoginDTO) {
        return this.authService.login(dto)
    }
}