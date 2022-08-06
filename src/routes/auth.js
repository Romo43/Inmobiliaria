import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields.js";
import { login } from "../controllers/auth.js";

// Create a new router
const router = Router();

// Login
router.post(
  "/login",
  [
    check("email", "Email is required").not().isEmpty().isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  login
);

// Export the router
export default router;
