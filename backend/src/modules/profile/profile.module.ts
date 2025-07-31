import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { CloudinaryService } from "../images/cloudinary.service";


@Module({
    imports: [PrismaModule],
    controllers: [ProfileController],
    providers: [ProfileService, CloudinaryService],
})

export class ProfileModule {}