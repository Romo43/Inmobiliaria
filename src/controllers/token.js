import Token from "../models/token.js";
import User from "../models/User.js";
import { sendEmail } from "../helper/sendEmail.js";

// Generate token
const generateToken = async (req, res) => {
  try {
    // Generate number with 6 between 100000 and 999999
    const token = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    const dateNow = new Date();
    const newToken = new Token({
      token: token,
      user: req.userId,
      // Add 5 minutes to current time
      expiresIn: dateNow.setMinutes(dateNow.getMinutes() + 5),
    });
    await sendEmail(newToken.token, req.userPrimaryEmail);
    await newToken.save();
    res.status(200).json({ message: "Token generated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Validate token
const validateToken = async (req, res) => {
  const { token } = req.body;
  try {
    const userToken = await Token.findOne({
      user: req.userId,
      token: token,
      status: true,
    });
    await Token.findByIdAndUpdate(userToken._id, { status: false });
    await User.findByIdAndUpdate(req.userId, { change_password: true });
    res.status(200).json({ message: "Token validated" });
  } catch (err) {}
};

export { generateToken, validateToken };
