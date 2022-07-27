import User from "../models/User.js";

// Change password
const changePassword = async (req, res) => {
  const id = req.userId;
  try {
    const employee = await User.findById(id);
    if (!employee.change_password) {
      return res.status(400).json({ message: "You can not change password" });
    }
    const { password } = req.body;
    employee.password = await User.encryptPassword(password);
    employee.change_password = false;
    await employee.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { changePassword };
