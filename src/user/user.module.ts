import { Module } from "@nestjs/common";
import { UserController } from "src/user/user.controller";
import { UserService } from "./user.service";
import { DatabaseModule } from "../database/database.module";
import { PdfService } from "./report.service";
import { MapperService } from "./mapper/user.mapper";

@Module({
    controllers: [UserController],
    providers: [UserService, PdfService, MapperService],
    imports: [DatabaseModule],
    exports: [UserService]
})
export class UserModule {}