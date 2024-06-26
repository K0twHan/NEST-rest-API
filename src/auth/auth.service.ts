import { ForbiddenException, Injectable } from "@nestjs/common";
import { async, from } from "rxjs";
import { AuthDto } from "../auth/dto";
import { PrismaService } from "../prisma/prisma.service";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
@Injectable({})
export class AuthService {
    constructor(private prisma:PrismaService,private jwt : JwtService,private config: ConfigService) {}
    
    async signup(dto: AuthDto) {
        // generate password hash
        const hash = await argon.hash(dto.password);
        // save new user in database
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
            });
            return this.signToken(user.id,user.email);

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                throw new ForbiddenException('Credentials taken')
                }
            }
            throw error;
        }

        //return the new user
        
    }
       
        

       
        

        //send back user
    async signin(dto: AuthDto) { 
         // return the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        // if user doesn't exist give an error
        if (!user) {
            throw new ForbiddenException('Credentials incorrect')
        }
         //compare password
         const pwMatches = await argon.verify(user.hash,dto.password)
         // if password is false give an error
         if (!pwMatches) {
            throw new ForbiddenException('Credentials incorrect')
         }

         return this.signToken(user.id,user.email);
        
    
    
        
        };

          async signToken(userId: number,email:string):Promise<{acces_token : string}>{
            const payload = {
                sub: userId,
                email
            }
            const secret = this.config.get('JWT_SECRET')
            const token = await this.jwt.signAsync(payload,{expiresIn:'15m',secret:secret})
             
            return {acces_token : token}
        
        }
    } 