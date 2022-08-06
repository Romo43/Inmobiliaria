import { Router } from "express";
import { check } from "express-validator";
import { changePassword } from "../controllers/employee.js";
import { verifyToken } from "../middlewares/authJwt.js";
import { validateFields } from "../middlewares/validateFields.js";
import { checkChangePasswordFalse, checkUserExistsByToken } from "../middlewares/dbValidators.js";

// Create a new router
const router = Router();

// Middleware config
router.use(verifyToken);
router.use(checkUserExistsByToken);
router.use(checkChangePasswordFalse);

// Change password
router.put(
  "/change-password",
  [
    // check password is required
    check("password", "Password is required").not().isEmpty(),
    // check("password", "New password is required").not().isEmpty().trim(),
    validateFields,
  ],
  changePassword
);

// Export the router
export default router;
