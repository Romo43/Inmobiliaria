import { Router } from "express";
// import { check } from "express-validator";
import { verifyToken } from "../middlewares/authJWT.js";
import { checkUserExists } from "../middlewares/dbValidators.js";
// import { validateFields } from "../middlewares/validateFields.js";
import { generateToken } from "../controllers/token.js";
import { checkUserHasToken } from "../middlewares/dbValidators.js";

// Create a new router
const router = Router();

// Middleware config
router.use(verifyToken);
router.use(checkUserExists);

// Create token
router.post("/generate-token", [checkUserHasToken], generateToken);

// Validate token
// router.post(
//   "/validate-token",
//   [
//     check("token", "Token is required").isNumeric().not().isEmpty(),
//     validateFields,
//   ],
//   validateToken
// );

// Export the router
export default router;
