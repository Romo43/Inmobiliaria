import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config.js";

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isPasswordValid = await User.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, SECRET);
    res.status(200).json({ data: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { login };
