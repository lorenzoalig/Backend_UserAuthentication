import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from "./dto/user-login.dto";


type UserSignInData = {
    userId: number,
    email: string
}
type AuthOutput = {
    accessToken: string,
    userId: number,
    email: string
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userService : UserService,
        private readonly jwtService : JwtService
    ) {}

    // Authenticate user login attempt. If successful, returns an access token. Otherwise, throws unauthorized exception.
    async authenticate(input : UserLoginDto) : Promise<AuthOutput>{
        const signInData = await this.validateUser(input);

        if(!signInData) throw new UnauthorizedException();
        return this.signIn(signInData);
    }

    // Validates a username and password input (with bcrypt validation) with the database
    async validateUser(input : UserLoginDto) : Promise<UserSignInData | null> {
        const user = await this.userService.findUserByEmail(input.email);

        if(user && await bcrypt.compare(input.password, user.password)) {
            return {
                userId: user.user_infoId,
                email: user.email
            }
        }
        return null;
    }

    // Signs the JWT payload with the user's validated sign-in data
    async signIn(signInData : UserSignInData) : Promise<AuthOutput> {
        const tokenPayLoad = {
            sub: signInData.userId,
            username: signInData.email
        }
        const accessToken = await this.jwtService.signAsync(tokenPayLoad);
        return {accessToken, userId: signInData.userId ,email: signInData.email};
    }
}