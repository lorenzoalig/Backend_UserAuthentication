import { Body, Controller, Get, HttpCode, HttpStatus, NotImplementedException, Param, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { AuthGuard } from "./guards/auth.guard";

export type UserLoginAttempt = {
    username: string,
    password: string
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Post('login')
    login(@Body() input: UserLoginAttempt) {
        return this.authService.authenticate(input);
    }

    @Get('me')
    @UseGuards(AuthGuard)
    returnUser(@Request() request) {
        return request.user;
    }
}