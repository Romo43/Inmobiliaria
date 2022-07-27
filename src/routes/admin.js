import { Router } from "express";
import { check } from "express-validator";
import { verifyToken, onlyAdmin } from "../middlewares/authJwt.js";
import {
  getAllEmployees,
  getAllEstates,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
  deleteEstateById,
} from "../controllers/admin.js";
import {
  checkEmailExists,
  checkPrimaryEmailExists,
  checkUserExistsByParamsId,
} from "../middlewares/dbValidators.js";
import { validateFields } from "../middlewares/validateFields.js";
import { checkUserExists } from "../middlewares/dbValidators.js";

// Create a new router
const router = Router();

// Middleware config
router.use(verifyToken);
router.use(checkUserExists);
router.use(onlyAdmin);

// Get all employees
router.get("/employees", getAllEmployees);

// Get all estates
router.get("/estates", getAllEstates);

// Create employees
router.post(
  "/employee",
  [
    check("username").not().isEmpty().withMessage("Username is required"),
    check("email").isEmail().withMessage("Email is required"),
    check("primary_email").isEmail().withMessage("Primary email is required"),
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
    check("id").trim().isMongoId().withMessage("Id is required"),
    check("username").not().isEmpty().withMessage("Username is required"),
    check("email").isEmail().withMessage("Email is required"),
    check("primary_email").isEmail().withMessage("Primary email is required"),
    validateFields,
    checkEmailExists,
    checkPrimaryEmailExists,
  ],
  updateEmployeeById
);

// Delete Employee by id
router.delete(
  "/employee/:id",
  [
    check("id").trim().isMongoId().withMessage("Id is required"),
    validateFields,
    checkUserExistsByParamsId,
  ],
  deleteEmployeeById
);

// Delete estate by Id
router.delete(
  "/estate/:id",
  [
    check("id").trim().isMongoId().withMessage("Id is required"),
    validateFields,
  ],
  deleteEstateById
);

// Export the router
export default router;
