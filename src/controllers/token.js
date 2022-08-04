import Token from "../models/token.js";

// Generate token
const generateToken = async (req, res) => {
  try {
    const token = Math.floor(Math.random() * 1000000);
    const dateNow = new Date();
    const newToken = new Token({
      token: token,
      user: req.userId,
      // Add 5 minutes to current time
      expiresIn: dateNow.setMinutes(dateNow.getMinutes() + 5),
    });
    await newToken.save();
    res.status(200).json({ data: newToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Validate token
// const validateToken = async (req, res) => {};

export { generateToken };
