import { AuthDto } from "../auth/dto";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signup(dto: AuthDto): Promise<{
        acces_token: string;
    }>;
    signin(dto: AuthDto): Promise<{
        acces_token: string;
    }>;
    signToken(userId: number, email: string): Promise<{
        acces_token: string;
    }>;
}
