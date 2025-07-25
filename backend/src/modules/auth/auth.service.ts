import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";
import * as bcrypt from 'bcrypt';
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { access } from "fs";


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {}

    async register(dto: RegisterDTO) {
        try {
            const existing = await this.prisma.user.findUnique({
            where: { email: dto.email },
            });
            if (existing) throw new ConflictException('Email already in use!');

            if (dto.password !== dto.password_confirmation) {
            throw new ConflictException('Passwords do not match!');
            }

            const hashed = await bcrypt.hash(dto.password, 10);

            const dummyUser = {
                id: -1,
                email: dto.email
            }
            const payload = {sub: dummyUser.id, email: dummyUser.email}
            const token = this.jwt.sign(payload)

            const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                name: dto.name,
                password: hashed,
                profile: {
                    create: {},
                }
            },
            });

            return {
                token: this.jwt.sign({ sub: user.id, email: user.email }),
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
            };

        } catch (error) {
            console.error('[REGISTER ERROR]', error);
            throw new InternalServerErrorException('Something went wrong');
        }
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

        return {
            accessToken: this.jwt.sign({userId: user.id})
        };
    }
}