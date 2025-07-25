import { Controller, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";


@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true}),
        PrismaModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'SunnyDay',
            signOptions: {expiresIn: '7d'}
        }),
        PassportModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})

export class AuthModule{}