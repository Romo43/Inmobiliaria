import { config } from 'dotenv'
config()

export default {
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT,
    SECRET: process.env.TOKEN,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
}