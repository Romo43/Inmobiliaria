import mongoose from "mongoose";
const { connect } = mongoose;
import { MONGO_URL } from "../config/config.js";

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
