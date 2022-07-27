import mongoose from "mongoose";
const { Schema, model } = mongoose;

const estateSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    estate_type: {
      type: String,
      enum: ["house", "department"],
      required: true,
    },
    estate_status: {
      type: String,
      enum: ["rent", "sale"],
      required: true,
    },
    status: {
      type: String,
      enum: ["sale", "sold"],
      default: "sale",
    },
    imgs: [
      {
        id_media: String,
        media: String,
      },
    ],
    areas: [String],
    equipped: [String],
    details: {
      terrain: {
        type: String,
      },
      preserved: {
        type: String,
      },
      service_room: {
        type: Boolean,
      },
      rooms: {
        type: Number,
      },
      floors: {
        type: Number,
      },
      parking: {
        type: Number,
      },
      construction: {
        type: String,
      },
      old_estate: {
        type: String,
      },
      bathrooms: {
        type: Number,
      },
      maintenance: {
        type: Number,
      },
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
