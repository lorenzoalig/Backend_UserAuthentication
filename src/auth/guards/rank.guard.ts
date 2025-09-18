import { CanActivate, ExecutionContext, Injectable, Request, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";


@Injectable()
export class RankGuard implements CanActivate {
    constructor(private readonly userService : UserService) {}

    async canActivate(@Request() request) {
        
        const username = request.user.username;
        let user1 = await this.userService.findUserByUsername(username);
        const userId = user1?.user_infoId
        const user2 = await this.userService.findUserById(userId!);

        if(user2?.rank! < 4)
            throw new UnauthorizedException('Not authorized for current user rank');

        return true;
    }
}