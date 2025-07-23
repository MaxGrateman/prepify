import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";
import * as bcrypt from 'bcrypt';
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {}

    async register(dto: RegisterDTO) {
        const exsisting = await this.prisma.user.findUnique({where: {email: dto.email} });
        if (exsisting) throw new ConflictException('Email already in use!');

        if (dto.password !== dto.password_confirmation) {
            throw new ConflictException('Passwords do not match!')
        }

        const hashed = await bcrypt.hash(dto.password, 10)
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                name: dto.name,
                password: dto.password
            }
        })

        return this._returnUserWithToken(user);
    }

    async login(dto: LoginDTO) {
        const user = await this.prisma.user.findUnique({where: {email: dto.email} })
        if (!user) throw new UnauthorizedException('Invalid credentials!')

        const isValid = await bcrypt.compare(dto.password, user.password);
        if (!isValid) throw new UnauthorizedException('Invalid password!')

        await this.prisma.user.update({
            where: {id: user.id},
            data: {lastLogin: new Date()}
        })

        return this._returnUserWithToken(user);
    }

    private _returnUserWithToken(user: any) {
        const payload = {sub: user.id, email: user.email}
        const token = this.jwt.sign(payload)

        return {
            token,
            user: {
                id: user.id,
                email: user.id,
                name: user.name
            }
        }
    }
}