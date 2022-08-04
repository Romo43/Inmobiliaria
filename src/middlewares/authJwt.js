import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Role from "../models/Role.js";
import { SECRET } from "../config/config.js";

// Verify token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, SECRET);    
    req.userId = decoded.user.uid;
    req.userEmail = decoded.user.email;
    req.userUsername = decoded.user.username;
    req.userPhone = decoded.user.phone;
    next();
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// Only admin
const onlyAdmin = async (req, res, next) => {
  const id = req.userId;
  try {
    const user = await User.findById(id);
    const role = await Role.findById(user.role);
    if (role.name !== "admin")
      return res.status(401).json({ message: "Unauthorized" });
    next();
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// Export middlewares
export { verifyToken, onlyAdmin };
