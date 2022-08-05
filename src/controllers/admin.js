import User from "../models/User.js";
import Role from "../models/Role.js";
import Estate from "../models/Estate.js";
import Token from "../models/token.js";
import { destroyUrls } from "../helper/imageUpload.js";

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const role = await Role.findOne({ name: "employee" });
    const [employees, total] = await Promise.all([
      User.find({ role: role._id })
        .skip((page - 1) * limit)
        .limit(limit),
      User.countDocuments({ role: role._id }),
    ]);
    res.status(200).json({ total, data: employees });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get all estates
const getAllEstates = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const [estates, total] = await Promise.all([
      Estate.find()
        .skip((page - 1) * limit)
        .limit(limit),
      Estate.countDocuments(),
    ]);
    res.status(200).json({ total, data: estates });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get all tokens
const getAllTokens = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const [tokens, total] = await Promise.all([
      Token.find()
        .skip((page - 1) * limit)
        .limit(limit),
      Token.countDocuments(),
    ]);
    res.status(200).json({ total, data: tokens });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get employee by id
const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findOne({ name: "employee" });
    const employee = await User.findOne({ _id: id, role: role });
    res.status(200).json({ data: employee });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get estate by id
const getEstateById = async (req, res) => {
  const { id } = req.params;
  try {
    const { page = 1, limit = 10 } = req.query;
    const estate = await Estate.findById(id)
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json({ data: estate });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create employee
const createEmployee = async (req, res) => {
  try {
    const { username, email, primary_email, phone } = req.body;
    let employee = await User.create({
      username,
      email,
      primary_email,
      phone,
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
  const { username, email, primary_email, phone } = req.body;
  const { id } = req.params;
  try {
    let employee = await User.findById(id);
    employee.username = username;
    employee.email = email;
    employee.primary_email = primary_email;
    employee.phone = phone;
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
    const estate = await Estate.findById(id);
    // Delete images
    await destroyUrls(estate.imgs);
    await estate.remove();
    res.status(200).json({ message: "Estate deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  getAllEmployees,
  getAllEstates,
  getAllTokens,
  getEmployeeById,
  getEstateById,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
  deleteEstateById,
};
