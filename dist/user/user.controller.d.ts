import { User } from '@prisma/client';
export declare class UserController {
    getme(user: User): {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        hash: string;
        firtName: string;
        lastName: string;
    };
    editUser(): void;
}
