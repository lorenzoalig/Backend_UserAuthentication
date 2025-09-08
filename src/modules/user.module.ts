import { Module } from "@nestjs/common";
import { UserController } from "src/controllers/user/user.controller";

@Module({
    controllers: [UserController]
})
export class UserModule {}