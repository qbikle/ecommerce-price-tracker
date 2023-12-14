require("dotenv").config();
import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const db = mongoose.connection;
    db.on("connected", () => console.log("Connected to MongoDB"));
    db.on("error", (error) => {
      console.log(error);
      process.exit();
    });
  } catch (error) {
    console.log(error.message);
  }
}
