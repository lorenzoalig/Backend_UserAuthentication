import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService2 {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async checkUser(user: {username: string, password: string}) {
        const userCredentials = await this.userService.findUserByUsername(user.username);
        
        if(!userCredentials) return null;
        if(userCredentials.password === user.password) {
            return {
                userId: userCredentials.user_infoId,
                username: userCredentials.username
            }
        }
    }

    async authenticateLogin(user: {username: string, password: string}) {
        const userLogin = await this.checkUser(user);

        if(!userLogin) throw new UnauthorizedException();
        const payLoad = {
            sub: userLogin.userId,
            data: userLogin.username
        }
        const jwtToken = this.signToken(payLoad);
        return jwtToken;
    }

    signToken(payLoad: {sub: number, data: string}) {
        return {
            token: this.jwtService.sign(payLoad),
            userId: payLoad.sub,
            username: payLoad.data
        }
    }
}