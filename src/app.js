import cors from "cors";
import morgan from "morgan";
import multer from "multer";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "./database/database.js";
import { PORT } from "./config/config.js";
import adminRoute from "./routes/admin.js";
import employeeRoute from "./routes/employee.js";
import authRoute from "./routes/auth.js";
import estateRoute from "./routes/estate.js";
//import "./helper/createAdmin.js";

// Initializations
const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "uploads")));

// Multer middleware many files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploadMany = multer({ storage: storage });
app.use(uploadMany.array("image", 10));

// Routes
app.use("/api/admin", adminRoute);
app.use("/api/employee", employeeRoute);
app.use("/api/auth", authRoute);
app.use("/api/estate", estateRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
