import User from "../models/user.js";

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
  } catch (error) {
    res.status(500).json({ message: error });
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
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Export helpers
export { checkUserExistsByParamsId, checkUserExists, checkEmailExists, checkPrimaryEmailExists };
