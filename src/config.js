import { config } from "dotenv";

config();

const {
  PORT = 8080,
  SECRET,
  NODE_ENV,
  MONGO_ENV,
  MONGO_USER,
  MONGO_PORT,
  MONGO_NAME,
  MONGO_PASSWORD,
  CLOUDINARY_KEY,
  CLOUDINARY_NAME,
  CLOUDINARY_SECRET,
} = process.env;

// Database configuration
const [MONGO_LOCAL_HOST, MONGO_CLOUD_HOST] = [
  `mongodb://127.0.0.1:27017/${MONGO_NAME}`,
  `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PORT}.mongodb.net/${MONGO_NAME}?retryWrites=true&w=majority`,
];

const MONGO_URI = MONGO_ENV == 0 ? MONGO_LOCAL_HOST : MONGO_CLOUD_HOST;
const CURRENT_DB = MONGO_ENV == 0 ? "locally" : "in the cloud";
const CURRENT_ENV = NODE_ENV == 0 ? "development" : "production";

const CLOUDINARY = {
  NAME: CLOUDINARY_NAME,
  KEY: CLOUDINARY_KEY,
  SECRET: CLOUDINARY_SECRET,
};

// Export configurations
export {
  PORT,
  SECRET,
  MONGO_URI,
  CURRENT_ENV,
  CURRENT_DB,
  CLOUDINARY,
};
