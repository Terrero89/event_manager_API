import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define User interface
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isValidPassword(password: string): Promise<boolean>;
}
const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Add method to validate password
UserSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

export const User = mongoose.model<IUser>('User', UserSchema);


