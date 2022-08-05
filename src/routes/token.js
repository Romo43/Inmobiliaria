import { Router } from "express";
import { check } from "express-validator";
import { verifyToken } from "../middlewares/authJwt.js";
import {
  checkUserExists,
  checkChangePassword,
  checkUserHasToken,
  checkTokenExists,
} from "../middlewares/dbValidators.js";
import { validateFields } from "../middlewares/validateFields.js";
import { generateToken, validateToken } from "../controllers/token.js";

// Create a new router
const router = Router();

// Middleware config
router.use(verifyToken);
router.use(checkUserExists);
router.use(checkChangePassword);

// Create token
router.post("/generate-token", [checkUserHasToken], generateToken);

// Validate token
router.post(
  "/validate-token",
  [
    // Check if token is numeric and has a length of 6
    check("token", "Token is required").isNumeric().isLength({ min: 6 }),
    validateFields,
    checkTokenExists,
  ],
  validateToken
);

// Export the router
export default router;
