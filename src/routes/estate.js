import { Router } from "express";
import { check } from "express-validator";
import { verifyToken } from "../middlewares/authJwt.js";
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

// Estate search

// Get all user estates
router.get("/user_estates", allEstates);
// Get estate by Id
router.get(
  "/:id",
  [check("id", "Id is required").trim().isMongoId(), validateFields],
  findEstate
);
// Create new estate
router.post(
  "/create",
  [
    check("name", "Name is required").trim(),
    check("description", "Description is required").trim(),
    check("price", "Price is required").trim().isNumeric(),
    check("estate_type", "Estate type is required")
      .trim()
      .isIn(["department", "house"]),
    check("estate_status", "Estate status is required")
      .trim()
      .isIn(["sale", "rent"]),
    check("areas", "Areas is required").trim(),
    check("equipped", "Equipped is required").trim(),
    check("terrain", "Terrain is required").trim().isNumeric(),
    check("preserved", "Preserved is required").trim(),
    check("service_room", "Service room is required").trim().isBoolean(),
    check("rooms", "Rooms is required").trim().isNumeric(),
    check("floors", "Floors is required").trim().isNumeric(),
    check("parking", "Parking is required").trim().isNumeric(),
    check("construction", "Construction is required").trim().isString(),
    check("old_estate", "Old estate is required").trim().isString(),
    check("bathrooms", "Bathrooms is required").trim().isNumeric(),
    check("maintenance", "Maintenance is required").trim().isNumeric(),
    check("coordinates", "Coordinates is required").trim(),
    validateFields,
  ],
  createEstate
);
// Update all estate by Id
router.patch(
  "/:id",
  [
    check("id", "Id is required").trim().isMongoId(),
    check("name", "Name is required").trim(),
    check("description", "Description is required").trim(),
    check("price", "Price is required").trim().isNumeric(),
    check("estate_type", "Estate type is required")
      .trim()
      .isIn(["department", "house"]),
    check("estate_status", "Estate status is required")
      .trim()
      .isIn(["sale", "rent"]),
    check("areas", "Areas is required").trim(),
    check("equipped", "Equipped is required").trim(),
    check("terrain", "Terrain is required").trim().isNumeric(),
    check("preserved", "Preserved is required").trim(),
    check("service_room", "Service room is required").trim().isBoolean(),
    check("rooms", "Rooms is required").trim().isNumeric(),
    check("floors", "Floors is required").trim().isNumeric(),
    check("parking", "Parking is required").trim().isNumeric(),
    check("construction", "Construction is required").trim().isString(),
    check("old_estate", "Old estate is required").trim().isString(),
    check("bathrooms", "Bathrooms is required").trim().isNumeric(),
    check("maintenance", "Maintenance is required").trim().isNumeric(),
    check("coordinates", "Coordinates is required").trim(),
    validateFields,
  ],
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
