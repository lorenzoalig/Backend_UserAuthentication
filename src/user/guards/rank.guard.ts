import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";


@Injectable()
export class RankGuard implements CanActivate {
    constructor(private readonly userService : UserService) {}

    async canActivate(context : ExecutionContext) {       
        const req = context.switchToHttp().getRequest();
        const username = req.user.username;
        const user = await this.userService.findUserByUsername(username);
        
        if(!user)
            throw new NotFoundException('User not found');
        if(user.rank < 4)
            throw new UnauthorizedException('Access denied: not allowed for current user rank');
        return true;
    }
}