import { Module } from "@nestjs/common";
import { UserController } from "src/user/user.controller";
import { UserService } from "./user.service";
import { DatabaseModule } from "../database/database.module";
import { PdfService } from "./report.service";

@Module({
    controllers: [UserController],
    providers: [UserService, PdfService],
    imports: [DatabaseModule],
    exports: [UserService]
})
export class UserModule {}