import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { UserService } from "../user/service/user.service";
import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./service/auth.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [AuthController],
    providers: [AuthService,UserService]
})
export class AuthModule{}