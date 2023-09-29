import { AuthService } from "./auth.service";
import { AuthDto } from "../auth/dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: AuthDto): Promise<{
        acces_token: string;
    }>;
    signin(dto: AuthDto): Promise<{
        acces_token: string;
    }>;
}
