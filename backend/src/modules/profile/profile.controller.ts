import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ProfileService } from "./profile.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

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
}