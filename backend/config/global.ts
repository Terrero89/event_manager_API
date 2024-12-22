import * as dotenv from 'dotenv';

dotenv.config();

export const CONFIG = {
    environments:{
        development: process.env.NODE_ENV === 'development',
        test: process.env.NODE_ENV === 'test',
        production: process.env.NODE_ENV === 'production'
    },

    PORT: process.env.PORT || 3000,
    MONGODB_URL: process.env.MONGODB_URL || '',
    JWT_SECRET:process.env.JWT_SECRET || '',
}
