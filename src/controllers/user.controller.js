import User from "../models/User.js";
import Role from "../models/Role.js";
import jwt from "jsonwebtoken";

// Login
const login = async (req, res) => {
  try {
    // Request body email can be an email or username
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });

    const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.json({ token });
  } catch (err) {
    console.log(err);
  }
};
// Register
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    });
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
// Create admin, employee or user
const createUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        const { username, email, password, roles } = req.body;
        const rolesFound = await Role.find({ name: { $in: roles } });
        const user = new User({
          username,
          email,
          password,
          roles: rolesFound.map((role) => role._id),
        });
        user.password = await User.encryptPassword(user.password);
        const savedUser = await user.save();
        return res.status(200).json({
          _id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
          roles: savedUser.roles,
        });
      }
    }
    res.status(403).json({ message: "Require Admin Role!" });
  } catch (err) {
    console.error(err);
  }
};

export { login, register, createUser };
