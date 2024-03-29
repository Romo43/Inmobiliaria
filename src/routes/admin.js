import { Router } from "express";
import { check } from "express-validator";
import { verifyToken, onlyAdmin } from "../middlewares/authJwt.js";
import {
  getAllEmployees,
  getAllEstates,
  getAllTokens,
  getEmployeeById,
  getEstateById,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
  deleteEstateById,
} from "../controllers/admin.js";
import {
  checkUserExistsByParamsId,
  checkEstateExistsByParamsId,
  checkEmailExists,
  checkPrimaryEmailExists,
  checkUserExistsByToken,
} from "../middlewares/dbValidators.js";
import { validateFields } from "../middlewares/validateFields.js";

// Create a new router
const router = Router();

// Middleware config
router.use(verifyToken);
router.use(checkUserExistsByToken);
router.use(onlyAdmin);

// Get all employees
router.get("/employees", getAllEmployees);

// Get all estates
router.get("/estates", getAllEstates);

// Get all tokens
router.get("/tokens", getAllTokens);

// Get employee by id
router.get(
  "/employee/:id",
  [
    check("id", "Id is required").trim().isMongoId(),
    validateFields,
    checkUserExistsByParamsId,
  ],
  getEmployeeById
);

// Get estate by id
router.get(
  "/estate/:id",
  [
    check("id", "Id is required").trim().isMongoId(),
    validateFields,
    checkEstateExistsByParamsId,
  ],
  getEstateById
);

// Create employees
router.post(
  "/employee",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("primary_email", "Primary email is required").isEmail(),
    check("phone", "Phone is required")
      .isMobilePhone()
      .isLength({ min: 10, max: 10 }),
    validateFields,
    checkEmailExists,
    checkPrimaryEmailExists,
  ],
  createEmployee
);

// Update Employee by id
router.put(
  "/employee/:id",
  [
    check("id", "Id is required").trim().isMongoId(),
    check("username", "Username is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("primary_email", "Primary email is required").isEmail(),
    check("phone", "Phone is required")
      .isMobilePhone()
      .isLength({ min: 10, max: 10 }),
    validateFields,
    checkEmailExists,
    checkPrimaryEmailExists,
    checkUserExistsByParamsId,
  ],
  updateEmployeeById
);

// Delete Employee by id
router.delete(
  "/employee/:id",
  [
    check("id", "Id is required").trim().isMongoId(),
    validateFields,
    checkUserExistsByParamsId,
  ],
  deleteEmployeeById
);

// Delete estate by Id
router.delete(
  "/estate/:id",
  [
    check("id", "Id is required").trim().isMongoId(),
    validateFields,
    checkEstateExistsByParamsId,
  ],
  deleteEstateById
);

// Export the router
export default router;
