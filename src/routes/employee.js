import { changePassword } from "../controllers/employee.js";
import { Router } from "express";
import { verifyToken } from "../middlewares/authJWT.js";

// Create a new router
const router = Router();

// Middleware config
router.use(verifyToken);

// Change password
router.put("/change-password", changePassword);

// Export the router
export default router;
