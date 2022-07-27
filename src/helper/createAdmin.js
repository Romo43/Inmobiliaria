import User from "../models/user.js";
import Role from "../models/role.js";

// Create default admin
(async () => {
  try {
    const adminRole = await Role.findOne({ name: "admin" });
    if (!adminRole) return;
    const newUser = new User({
      username: "admin",
      email: "admin@webdev.com",
      primary_email: "admin@gmail.com",
      password: await User.encryptPassword("admin"),
      role: adminRole._id,
    });
    const savedUser = await newUser.save();
    console.log(`Admin user created: ${savedUser.username}`);
  } catch (err) {
    console.log(err.message);
  }
})();
