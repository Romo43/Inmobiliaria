import User from "../models/User.js";
import Estate from "../models/Estate.js";
import Token from "../models/token.js";

// Check if user exists by params id
const checkUserExistsByParamsId = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Check if estate exists by params id
const checkEstateExistsByParamsId = async (req, res, next) => {
  const { id } = req.body;
  try {
    const estate = await Estate.findById(id);
    if (estate) return res.status(404).json({ message: "Estate not found" });
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Check if user exists
const checkUserExists = async (req, res, next) => {
  const id = req.userId;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Check if email already exists
const checkEmailExists = async (req, res, next) => {
  try {
    const email = await User.findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({ message: "The email already exists" });
    next();
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Check if primary email already exists
const checkPrimaryEmailExists = async (req, res, next) => {
  try {
    const primaryEmail = await User.findOne({
      primary_email: req.body.primary_email,
    });
    if (primaryEmail)
      return res
        .status(400)
        .json({ message: "The primary email already exists" });
    next();
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Check if change password is true
const checkChangePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user.change_password)
      return res.status(400).json({
        message:
          "User can not generate or validate token if change_password is true",
      });
    next();
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Check if user has a token with status true and is expired
const checkUserHasToken = async (req, res, next) => {
  try {
    const token = await Token.findOne({ user: req.userId, status: true });
    if (token) {
      // Check if token is expired
      if (token.expiresIn < Date.now()) {
        await Token.findByIdAndUpdate(token._id, { status: false });
        return res
          .status(401)
          .json({ message: "You already had an active request, try again" });
      }
      return res.status(400).json({ message: "User already has a token" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Check if token exists and is valid
const checkTokenExists = async (req, res, next) => {
  const { token } = req.body;
  try {
    const userToken = await Token.findOne({
      user: req.userId,
      token: token,
      status: true,
    });
    if (!userToken || userToken.expiresIn < Date.now()) {
      return res.status(401).json({ message: "Invalid token" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Export helpers
export {
  checkUserExistsByParamsId,
  checkEstateExistsByParamsId,
  checkUserExists,
  checkEmailExists,
  checkPrimaryEmailExists,
  checkChangePassword,
  checkUserHasToken,
  checkTokenExists,
};
