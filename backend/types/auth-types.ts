import { Request } from 'express';

export interface AuthRequest extends Request {
    user?: string | object;
}


export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isValidPassword(password: string): Promise<boolean>;
}