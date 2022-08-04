import User from "../models/User.js";
import Role from "../models/Role.js";

// Create default admin
(async () => {
  try {
    const adminRole = await Role.findOne({ name: "admin" });
    if (!adminRole) return;
    const newUser = new User({
      username: "admin2",
      email: "admin2@webdev.com",
      primary_email: "admin2@gmail.com",
      password: await User.encryptPassword("admin2"),
      role: adminRole._id,
    });
    const savedUser = await newUser.save();
    console.log(`Admin user created: ${savedUser.username}`);
  } catch (err) {
    console.log(err.message);
  }
})();
