"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenFromCookie = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const global_1 = require("../config/global");
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Access denied' });
        return;
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, global_1.CONFIG.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
exports.verifyToken = verifyToken;
const verifyTokenFromCookie = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized: Token not provided' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.body.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
exports.verifyTokenFromCookie = verifyTokenFromCookie;
