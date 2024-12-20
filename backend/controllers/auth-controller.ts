import { Request, Response } from 'express';
import { User, IUser } from '../models/user-model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { sendEmail } from '../utils/mailer';

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


          // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create new user
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        

         // Send welcome email
        const emailSubject = 'Welcome to Our Event manager app!';
        const emailText = `Hi ${username},\n\nThank you for registering at our app. We're excited to have you on board!`;
        const emailHtml = `<p>Hi <strong>${username}</strong>,</p><p>Thank you for registering at our app. We're excited to have you on board!</p>`;

        const previewURL = await sendEmail(email, emailSubject, emailText, emailHtml);

        console.log("email being sent successfullyyyyy", previewURL);

        // Respond to the client
        res.status(201).json({ message: 'User registered successfully', previewURL });
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

export const sendEmailController = async (req: Request, res: Response): Promise<void> => {
    const { to, subject, text, html } = req.body;

    try {
        await sendEmail(to, subject, text, html);
        console.log("email being sent successfully")
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send email.' });
    }
};