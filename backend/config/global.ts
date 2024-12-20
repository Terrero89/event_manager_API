import * as dotenv from 'dotenv';

dotenv.config();

export const CONFIG = {
    PORT: process.env.PORT || 3000,
    MONGODB_URL: process.env.MONGODB_URL || '',
    JWT_SECRET:process.env.JWT_SECRET || '',
}
