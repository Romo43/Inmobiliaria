import User from "../models/User.js";
import Role from "../models/Role.js";
import Estate from "../models/Estate.js";
import { destroy } from "../helper/imageUpload.js";

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const role = await Role.find({ name: "employee" });
    const employees = await User.find({ role: { $in: role } });
    res.status(200).json({ data: employees });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get all estates
const getAllEstates = async (req, res) => {
  try {
    const estates = await Estate.find();
    res.status(200).json({ data: estates });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Create employee
const createEmployee = async (req, res) => {
  try {
    const { username, email, primary_email } = req.body;
    let employee = await User.create({
      username,
      email,
      primary_email,
      password: await User.encryptPassword(username),
    });
    const role = await Role.findOne({ name: "employee" });
    employee.role = role._id;
    await employee.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update employee by id
const updateEmployeeById = async (req, res) => {
  const { username, email, primary_email } = req.body;
  const { id } = req.params;
  try {
    let employee = await User.findById(id);
    employee.username = username;
    employee.email = email;
    employee.primary_email = primary_email;
    await employee.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete user by id
const deleteEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    await user.remove();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete estate by id
const deleteEstateById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Estate.findById(id);
    const images = data.imgs;
    for (const image of images) {
      const id_media = image.id_media;
      destroy(id_media);
    }
    await data.remove();
    res.status(200).json({ message: "Estate deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  getAllEmployees,
  getAllEstates,
  createEmployee,
  deleteEmployeeById,
  updateEmployeeById,
  deleteEstateById,
};
