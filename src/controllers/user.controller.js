const User = require("../models/User");
const Role = require('../models/Role');
const jwt = require("jsonwebtoken");

module.exports = class userCtrl {
  static async signin (req, res) {
    try {
        // Request body email can be an email or username
        const userFound = await User.findOne({email: req.body.email}).populate(
          "roles"
        );

        if (!userFound) return res.status(400).json({message: "User Not Found"});

        const matchPassword = await User.comparePassword(
          req.body.password,
          userFound.password
        );

        if (!matchPassword)
          return res.status(401).json({
            token: null,
            message: "Invalid Password",
          });

        const token = jwt.sign({id: userFound._id}, process.env.SECRET, {
          expiresIn: 86400, // 24 hours
        });

        res.json({token});
    } catch (err) {
      console.log(err);
    }
  };
  static async signup (req, res) {
    try {
      // Getting the Request Body
      const { username, email, password } = req.body;
      // Creating a new User Object
      const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
      });

      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
  
      // Saving the User Object in Mongodb
      const savedUser = await newUser.save();
  
      // Create a token
      const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
        expiresIn: 86400, // 24 hours
      });
  
      return res.status(200).json({ token });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  static async createUser (req, res) {
    try {
      const { username, email, password, roles } = req.body;
  
      const rolesFound = await Role.find({ name: { $in: roles } });
  
      // creating a new User
      const user = new User({
        username,
        email,
        password,
        roles: rolesFound.map((role) => role._id),
      });
  
      // encrypting password
      user.password = await User.encryptPassword(user.password);
  
      // saving the new user
      const savedUser = await user.save();
  
      return res.status(200).json({
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        roles: savedUser.roles,
      });
    } catch (err) {
      console.error(err);
    }
  };
}