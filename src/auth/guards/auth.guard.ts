import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService : JwtService) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization; // 'Bearer <token>'
        const token = authorization?.split(' ')[1];
        console.log(token);

        if(!token) throw new UnauthorizedException('No token provided');
        try{
            const payLoad = await this.jwtService.verifyAsync(token);
            request.user = {
                userId: payLoad.sub,
                username: payLoad.username
            };
            return true;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}