import { Request, Response } from 'express';
import { User, IUser } from '../models/user-model';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Register a new user
export const registerController= async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: "Error registering user" });
    }
};

// Login a user
export const loginController = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: "EXPIRE TIME OF SESSION" });
    }
};

// Protected route example
export const protectedRouteController  = (req: Request, res: Response): void => {
    res.status(200).json({ message: 'Access granted to protected route', user: req.body.user }); // eye on this one
};