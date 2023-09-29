import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {JwtGuard} from '../auth/guard' 
import { GetUser } from '../auth/decorator';
import { use } from 'passport';
import { User } from '@prisma/client';
@Controller('users')
export class UserController {
    @UseGuards(JwtGuard)  
    @Get('me')
    getme(@GetUser() user:User) {
         
        return user
    }

    @Patch()
    editUser() {}
}
