import User from "../models/User.js";
import Estate from "../models/Estate.js";
import Token from "../models/token.js";

// Check if user exists by params id
const checkUserExistsByParamsId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Check if estate exists by params id
const checkEstateExistsByParamsId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const estate = await Estate.findById(id);
    if (estate) return res.status(404).json({ message: "Estate not found" });
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Check if user exists by token
const checkUserExistsByToken = async (req, res, next) => {
  const id = req.userId;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Check if user exists by email
const checkUserExistsByEmail = async (primary_email) => {
  try {
    const user = await User.findOne({ primary_email: primary_email });
    if (!user) return false;
    return user;
  } catch (err) {
    return false;
  }
}

// Check if email already exists
const checkEmailExists = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user)
      return res.status(400).json({ message: "The email already exists" });
    next();
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Check if primary email already exists
const checkPrimaryEmailExists = async (req, res, next) => {
  const { primary_email } = req.body;
  try {
    const user = await User.findOne({ primary_email: primary_email });
    if (user)
      return res
        .status(400)
        .json({ message: "The primary email already exists" });
    next();
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Check if change password is true
const checkChangePasswordTrue = async (email) => {
  try {
    const user = await User.findOne({ primary_email: email });
    if (!user.change_password) return false;
    return true;
  } catch (err) {
    return false;
  }
}

// Check if change password is false
const checkChangePasswordFalse = async (req, res, next) => {
  const id = req.userId;
  try {
    const user = await User.findById(id);
    if (!user.change_password)
      return res.status(400).json({ message: "User can not change password" });
    next();
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Check if user has a token with status true and is expired
const checkUserHasToken = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await checkUserExistsByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });
    // check change password true
    const changePasswordTrue = await checkChangePasswordTrue(email);
    if (changePasswordTrue)
      return res.status(400).json({ message: "User can not generate token" });
    const token = await Token.findOne({ user: user._id, status: true });
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
  checkUserExistsByToken,
  checkEmailExists,
  checkPrimaryEmailExists,
  checkChangePasswordFalse,
  checkUserHasToken,
  checkTokenExists,
};
