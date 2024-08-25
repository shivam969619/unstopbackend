import express from "express";
import {
  login,
  logout,
  register,
  updateprofile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router
  .route("/update-profile")
  .post(isAuthenticated, singleUpload, updateprofile);
export default router;
