import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("mongo db connected");
  } catch (error) {
    console.log(error.message);
  }
};
export default connectDB;
