import { Controller, Get, Put, UseGuards, Request, Body, Req, Post, UseInterceptors, UploadedFile } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ProfileService } from "./profile.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdatedProfileDto } from "./dto/update-profile.dto";
import { CloudinaryService } from "../images/cloudinary.service";
import * as multer from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('profile')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService,
        private readonly cloudinaryService: CloudinaryService,
    ) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({summary: 'Get user profile'})
    @ApiResponse({ status: 200, description: 'Profile returned successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getProfile(@Request() req) {
        return this.profileService.getProfile(req.user.userId)
    }

    @ApiOperation({summary: 'Change user profile'})
    @ApiResponse({ status: 200, description: 'Profile changed successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @UseGuards(AuthGuard('jwt'))
    @Put('me')
    async updateProfile(@Req() req, @Body() dto: UpdatedProfileDto) {
        const userId = req.user.userId;
        return this.profileService.updateProfile(userId, dto)
    }

    @Post('upload')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file', {
        storage: multer.memoryStorage(),
    }))
    async uploadProfileImage(
        @UploadedFile() file: Express.Multer.File,
        @Request() req
    ) {
        const userId = req.user.userId
        const result = await this.cloudinaryService.uploadImage(file)

        await this.profileService.updateProfile(userId, {
            image_path: result.secure_url
        })

        return {message: 'Upload successful', image_path: result.secure_url}
    }
}