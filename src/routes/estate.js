import { Router } from "express";
import { check } from "express-validator";
import { verifyToken } from "../middlewares/authJWT.js";
import {
  allEstates,
  findEstate,
  createEstate,
  updateEstate,
  updateEstateStatus,
} from "../controllers/estate.js";
import { validateFields } from "../middlewares/validateFields.js";
import { checkUserExists } from "../middlewares/dbValidators.js";

// Create a new router
const router = Router();

// Middleware config
router.use(verifyToken);
router.use(checkUserExists);

// Get all user estates
router.get("/user_estates", allEstates);
// Get estate by Id
router.get(
  "/:id",
  [check("id", "Id is required").trim().isMongoId(), validateFields],
  findEstate
);
// Create new estate
router.post("/create", createEstate);
// Update all estate by Id
router.patch(
  "/:id",
  [check("id", "Id is required").trim().isMongoId(), validateFields],
  updateEstate
);
// Update estate status by Id and status
router.put(
  "/update-status/:id",
  [check("id", "Id is required").trim().isMongoId(), validateFields],
  updateEstateStatus
);

// Export the router
export default router;
