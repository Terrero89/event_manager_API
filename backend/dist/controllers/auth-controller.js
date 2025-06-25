"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailController = exports.protectedRouteController = exports.logoutController = exports.loginController = exports.registerController = void 0;
const user_model_1 = require("../models/user-model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const mailer_1 = require("../utils/mailer");
dotenv_1.default.config();
// Register a new user
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const existingUser = yield user_model_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        // Hash password
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        // Create new user
        const user = new user_model_1.User({ username, email, password: hashedPassword });
        yield user.save();
        // Send welcome email
        const emailSubject = "Welcome to Our Event manager app!";
        const emailText = `Hi ${username},\n\nThank you for registering at our app. We're excited to have you on board!`;
        const emailHtml = `<p>Hi <strong>${username}</strong>,</p><p>Thank you for registering at our app. We're excited to have you on board!</p>`;
        const previewURL = yield (0, mailer_1.sendEmail)(email, emailSubject, emailText, emailHtml);
        // Respond to the client
        res
            .status(201)
            .json({ message: "User registered successfully", previewURL });
    }
    catch (error) {
        res.status(500).json({ error: "Error registering user" });
    }
});
exports.registerController = registerController;
// Login a user
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = yield user_model_1.User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Validate password
        const isMatch = yield user.isValidPassword(password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        // Set HttpOnly cookie
        // res.cookie("authToken", token, {
        //   httpOnly: true,
        //   secure: process.env.NODE_ENV === 'development', // Only over HTTPS in production
        //   sameSite: "strict", // Prevent CSRF attacks
        //   maxAge: 3600000, // 1 hour
        // });
        res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
    }
    catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.loginController = loginController;
const logoutController = (req, res) => {
    res.clearCookie('authToken');
    res.status(200).json({ message: 'Logged out successfully' });
};
exports.logoutController = logoutController;
// Protected route example
const protectedRouteController = (req, res) => {
    res
        .status(200)
        .json({
        message: "Access granted to protected route",
        user: req.body.user,
    }); // eye on this one
};
exports.protectedRouteController = protectedRouteController;
// test nodemailer only
const sendEmailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, subject, text, html } = req.body;
    try {
        yield (0, mailer_1.sendEmail)(to, subject, text, html);
        console.log("email being sent successfully");
        res.status(200).json({ message: "Email sent successfully!" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send email." });
    }
});
exports.sendEmailController = sendEmailController;
