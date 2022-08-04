import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  primary_email: {
    type: String,
    unique: true,
  },
  phone: {
    type: Number,
    require: true,
    minlength: 10,
    maxlength: 10,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  change_password: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.toJSON = function () {
  const {
    __v,
    _id,
    password,
    primary_email,
    role,
    change_password,
    created_at,
    ...user
  } = this.toObject();
  user.uid = _id;
  return user;
};

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

export default model("User", userSchema);
