import mongoose from "mongoose";
const { Schema, model } = mongoose;

const roleSchema = new Schema({ name: String });

roleSchema.methods.toJSON = function () {
  const { __v, _id, ...role } = this.toObject();
  role.uid = _id;
  return role;
};

export default model("Role", roleSchema);
