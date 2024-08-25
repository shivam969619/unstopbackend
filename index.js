import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({});
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js";
import jobRoutes from "./routes/job.routes.js";
import applicationRoutes from "./routes/application.routes.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.get("/home", (req, res) => {
  return res.status(200).json({
    message: "i am coming from backend",
    success: "true",
  });
});
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "i am coming from backend",
    success: "true",
  });
});
app.use(cors(corsOptions));
const PORT = 3000;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at port ${PORT}`);
});
