import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { UserLoginDto } from "./dto/user-login.dto";
import { RankGuard } from "../user/guards/rank.guard";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Post('login')
    login(
        @Body(new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true
        }))
        loginDto: UserLoginDto
    ) {
        return this.authService.authenticate(loginDto);
    }

    @Get('me')
    @UseGuards(AuthGuard)
    returnUser(@Request() request) {
        return request.user;
    }
}