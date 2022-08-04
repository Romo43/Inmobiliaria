import mongoose from "mongoose";
import { MONGO_URL } from "../config/config.js";
const { connect } = mongoose;

(async () => {
  try {
    await connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error", error);
  }
})();
