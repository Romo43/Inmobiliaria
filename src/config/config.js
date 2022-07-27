import { config } from "dotenv";

config();

const {
  PORT = 8080,
  SECRET,
  MONGO_URL = "mongodb://localhost:27017/test",
  CLOUDINARY_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET,
} = process.env;

// Cloudinary configuration
const CLOUDINARY = {
  NAME: CLOUDINARY_NAME,
  KEY: CLOUDINARY_KEY,
  SECRET: CLOUDINARY_SECRET,
};

// Export configurations
export { PORT, SECRET, MONGO_URL, CLOUDINARY };
