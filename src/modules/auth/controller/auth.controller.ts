import { Body, Controller, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { LoginDto } from "src/modules/auth/dto/login.dto";
import { Response } from "express";
import { UserService } from "src/modules/user/service/user.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() dto: LoginDto, @Res() res: Response) {
        return dto;
    }
}