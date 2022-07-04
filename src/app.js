import path from "path";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import express from "express";
import { PORT } from "./config.js";
import  userRoutes from "./routes/user.js";
import estateRoutes from "./routes/estate.js";

// Initializations
const app = express();

// Settings
app.set("port", PORT);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Save file locally
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname, "src/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + file.originalname);
  },
});
app.use(multer({ storage: storage }).array("media"));

// Routes
app.use("/api/AxioWeb/estate", estateRoutes);
app.use("/api/AxioWeb/user", userRoutes);

// Export app
export default app;
