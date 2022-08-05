import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tokenSchema = new Schema({
  token: {
    type: Number,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 6,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: true,
  },
  // Expires in 5 minutes
  expiresIn: {
    type: Date,
  },
});

tokenSchema.methods.toJSON = function () {
  const { __v, _id, ...token } = this.toObject();
  token.uid = _id;
  return token;
};

export default model("Token", tokenSchema);
