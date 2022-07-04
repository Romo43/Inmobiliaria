import mongoose from "mongoose";
const { connect } = mongoose;
import { CURRENT_ENV, CURRENT_DB, MONGO_URI } from "./config.js";

(async () => {
  try {
    await connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database running in ${CURRENT_ENV} ${CURRENT_DB}`);
  } catch (error) {
    console.log("Error", error);
  }
})();
