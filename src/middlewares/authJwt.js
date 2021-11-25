const jwt = require("jsonwebtoken")
const User = require("../models/User")
const Role = require("../models/Role")
require('dotenv').config();

module.exports = class authCtrl {
// Verify token
  static async verifyToken (req, res, next){
    let token = req.headers["x-access-token"];

    if (!token) return res.status(403).json({ message: "No token provided" });

    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.userId = decoded.id;
      const user = await User.findById(req.userId, { password: 0 });
      if (!user) return res.status(404).json({ message: "No user found" });

      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
  };
// Verify authorized personal
  static async authorizedPersonalOnly (req, res, next){
    try {
      const user = await User.findById(req.userId);
      const roles = await Role.find({ _id: { $in: user.roles } });

      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin" || roles[i].name === "employee") {
          next();
          return;
        }
      }
      return res.status(403).json({ message: "Authorized personal only" });
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: error });
    }
  };
// Verify admin role
  static async onlyAdmin (req, res, next){
    try {
      const user = await User.findById(req.userId);
      const roles = await Role.find({ _id: { $in: user.roles } });

      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      return res.status(403).json({ message: "Require Admin Role!" });
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: error });
    }
  };
// Verify that emails are not duplicated
  static async checkDuplicateEmail (req, res, next) {
    try {
      const email = await User.findOne({ email: req.body.email });
      if (email)
        return res.status(400).json({ message: "The email already exists" });
      next();
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
  
}