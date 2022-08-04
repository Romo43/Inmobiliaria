import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config.js";

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });    
    if (!user) return res.status(400).json({message: "Invalid email or password"})
    const isPasswordValid = await User.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ user }, SECRET);
    res.status(200).json({ data: {token, user} });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { login };
