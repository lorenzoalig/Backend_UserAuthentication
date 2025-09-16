import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserLoginAttempt } from "src/auth/auth.controller";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';


type SignInData = {
    userId: number,
    username: string
}
type AuthOutput = {
    accessToken: string,
    userId: number,
    username: string
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userService : UserService,
        private readonly jwtService : JwtService
    ) {}

    // Authenticate user login attempt. If successful, returns an access token. Otherwise, throws unauthorized exception.
    async authenticate(input : UserLoginAttempt) : Promise<AuthOutput>{
        const signInData = await this.validateUser(input);

        if(!signInData) throw new UnauthorizedException();
        return this.signIn(signInData);
    }

    // Validates a username and password input (with bcrypt validation) combination with the database
    async validateUser(input : UserLoginAttempt) : Promise<SignInData | null> {
        const user = await this.userService.findUserByUsername(input.username);

        if(user && await bcrypt.compare(input.password, user.password)) {
            return {
                userId: user.id,
                username: user.username
            }
        }
        return null;
    }

    // Signs the JWT payload with the user's validated sign-in data
    async signIn(signInData : SignInData) : Promise<AuthOutput> {
        const tokenPayLoad = {
            sub: signInData.userId,
            username: signInData.username
        }
        const accessToken = await this.jwtService.signAsync(tokenPayLoad);
        return {accessToken, userId: signInData.userId ,username: signInData.username};
    }
}