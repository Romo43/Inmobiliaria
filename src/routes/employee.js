import { Router } from "express";
import { check } from "express-validator";
import {
  changePassword,
  generateToken,
  validateToken,
} from "../controllers/employee.js";
import { validateFields } from "../middlewares/validateFields.js";
import {
  checkUserHasToken,
  checkTokenExists,
} from "../middlewares/dbValidators.js";

// Create a new router
const router = Router();

// Change password
router.put(
  "/change-password",
  [
    check("token", "Token is required").isNumeric().isLength({
      min: 6,
      max: 6,
    }),
    check("password", "Password is required").not().isEmpty().trim(),
    validateFields,
    checkTokenExists,
  ],
  changePassword
);

// Generate token by email
router.post(
  "/generate-token",
  [
    check("email", "Email is required").trim().isEmail(),
    validateFields,
    checkUserHasToken,
  ],
  generateToken
);

// Validate token
router.post(
  "/validate-token",
  [
    // Check if token is numeric and has minimum length of 6 and maximum length of 6
    check("token", "Token is required").isNumeric().isLength({
      min: 6,
      max: 6,
    }),
    validateFields,
    checkTokenExists,
  ],
  validateToken
);

// Export the router
export default router;
