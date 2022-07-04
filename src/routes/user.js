import { Router } from "express";
// Verify token
import {checkDuplicateEmail, verifyToken, authorizedPersonalOnly} from "../middlewares/authJwt.js";
// Get all user controllers
import {login, register, createUser} from "../controllers/user.controller.js";

const router = Router();
//
router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Login
router.post("/login", login);
// Register
router.post("/register", [checkDuplicateEmail], register);
// Create admin, employee or user
router.post(
  "/create",
  [
    verifyToken,
    authorizedPersonalOnly,
    checkDuplicateEmail,
  ],
  createUser
);

export default router;
