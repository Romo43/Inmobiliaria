import { Router } from "express";

// Verify token
import {verifyToken,authorizedPersonalOnly} from "../middlewares/authJwt.js";
// Get all estate controllers
import {allPublicEstates, allUserEstates, findEstate,createEstate, updateEstate, updateEstateStatus,deleteEstate} from "../controllers/estate.controller.js";

const router = Router();
// Get all public estates
router.get("/public_estates", allPublicEstates);
// Get all user estates
router.get(
  "/user_estates",
  [verifyToken, authorizedPersonalOnly],
  allUserEstates
);
// Get estate by Id
router.get("/:id", findEstate);
// Create new estate
router.post(
  "/",
  [verifyToken, authorizedPersonalOnly],
  createEstate
);
// Update all estate by Id
router.patch(
  "/:id",
  [verifyToken, authorizedPersonalOnly],
  updateEstate
);
// Update estate status by Id and status
router.put(
  "/:id",
  [verifyToken, authorizedPersonalOnly],
  updateEstateStatus
);
// Delete este by Id
router.delete(
  "/:id",
  [verifyToken, authorizedPersonalOnly],
  deleteEstate
);

export default router;
