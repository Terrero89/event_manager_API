import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/auth-types';
import { CONFIG } from '../config/global';


export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Access denied' });
        return;
    }

    try {
        const verified = jwt.verify(token,CONFIG.JWT_SECRET as string);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

export const verifyTokenFromCookie = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.authToken;

    if (!token) {
        res.status(401).json({ message: 'Unauthorized: Token not provided' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.body.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}