import { Controller, Get, Put, UseGuards, Request, Body, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ProfileService } from "./profile.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdatedProfileDto } from "./dto/update-profile.dto";

@ApiTags('profile')
@ApiBearerAuth()
@Controller()
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    @Get('profile')
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
        const userId = req.user.id;
        return this.profileService.updateProfile(userId, dto)
    }
}