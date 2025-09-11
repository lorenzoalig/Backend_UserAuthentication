import { Module } from "@nestjs/common";
import { UserController } from "src/controllers/user/user.controller";
import { UserService } from "src/services/user.service";
import { DatabaseModule } from "./database.module";

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [DatabaseModule]
})
export class UserModule {}