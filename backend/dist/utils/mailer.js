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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Ethereal Email Setup
const sendEmail = (to, subject, text, html) => __awaiter(void 0, void 0, void 0, function* () {
    // Generate SMTP service account from ethereal.email
    nodemailer_1.default.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }
        console.log('Credentials obtained, sending message...');
        // Create a SMTP transporter object
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'allison.schmeler@ethereal.email',
                pass: 'gQpdKQAsuTbtVB5tYa'
            }
        });
        // Message object
        let message = {
            from: 'Sergio Terrero <allison.schmeler@ethereal.email>',
            to,
            subject,
            text,
            html,
        };
        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer_1.default.getTestMessageUrl(info));
        });
    });
});
exports.sendEmail = sendEmail;
