import { config } from 'dotenv'
config()

export default {
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT || 8081,
    SECRET: process.env.TOKEN
}