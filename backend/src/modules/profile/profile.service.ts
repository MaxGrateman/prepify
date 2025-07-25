import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) {}

    async getProfile(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { profile: true },
        });

        if (!user) throw new NotFoundException('User not found');

        return {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    about: user.profile?.about ?? null,
                    age: user.profile?.age ?? null,
                    email_verified_at: user.profile?.email_verified_at ?? null,
                    country: user.profile?.country ?? null,
                    image_path: user.profile?.image_path?.trim() || '',
                    level: user.profile?.level ?? null,
                    stack: user.profile?.stack ?? null,
                }
        };
    }
}