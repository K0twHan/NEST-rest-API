import { Body, Controller, ParseIntPipe, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { Console } from "console";
import { AuthDto } from "../auth/dto";
import { dot } from "node:test/reporters";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: AuthDto) {

        
        return this.authService.signup(dto)};
    @Post('signin')
    signin(@Body() dto:AuthDto) {
        
        return this.authService.signin(dto)};

}