import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "src/auth/auth.controller";
import { AuthService } from "src/auth/auth.service";
import { UserModule } from "../user/user.module";


@Module({
    imports: [
        UserModule,
        JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '30m'}
    })],
    controllers: [AuthController],
    providers: [AuthService],
    exports: []
})
export class AuthModule {}