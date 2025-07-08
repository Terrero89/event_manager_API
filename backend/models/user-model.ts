import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define User interface
export interface IUser extends Document {
    fullname: string; // Optional field for full name
    username: string;
    email: string;
    password: string;
    userType?: string; // Optional field for user type
    isValidPassword(password: string): Promise<boolean>;
}
const UserSchema: Schema = new Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: false }
});

// Add method to validate password
UserSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

export const User = mongoose.model<IUser>('User', UserSchema);


