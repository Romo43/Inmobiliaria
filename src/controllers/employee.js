import User from "../models/User.js";

// Change password
const changePassword = async (req, res) => {
  const id = req.userId;
  const { password } = req.body;
  try {
    const employee = await User.findById(id);
    employee.password = await User.encryptPassword(password);
    employee.change_password = false;
    await employee.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { changePassword };
