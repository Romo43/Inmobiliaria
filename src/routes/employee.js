import { Router } from "express";
import { check } from "express-validator";
import { changePassword } from "../controllers/employee.js";
import { verifyToken } from "../middlewares/authJWT.js";
import { checkUserExists } from "../middlewares/dbValidators.js";

// Create a new router
const router = Router();

// Middleware config
router.use(verifyToken);
router.use(checkUserExists);

// Change password
router.put(
  "/change-password",
  [check("password").withMessage("New password is required")],
  changePassword
);

// Export the router
export default router;
