import mongoose from "mongoose";
const { Schema, model } = mongoose;

const estateSchema = Schema(
  {
    name: String,
    description: String,
    price: String,
    estate_type: {
      type: String,
      enum: ["house", "department"],
    },
    estate_status: {
      type: String,
      enum: ["rent", "SALE"],
    },
    status: {
      type: String,
      enum: ["sale", "sold"],
      default: "sale",
    },
    imgs: [
      {
        _id: false,
        id_media: String,
        media: String,
      },
    ],
    areas: [String],
    equipped: [String],
    details: {
      terrain: String,
      preserved: String,
      service_room: Boolean,
      rooms: Number,
      floors: Number,
      parking: Number,
      construction: String,
      old_estate: String,
      bathrooms: String,
      maintenance: String,
    },
    location: {
      type: {
        type: String,
        default: "point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    contact: {
      username: String,
      email: String,
    },
  },
  { timestamps: true }
);

estateSchema.methods.toJSON = function () {
  const { __v, _id, ...estate } = this.toObject();
  estate.uid = _id;
  return estate;
};

export default model("Estate", estateSchema);
