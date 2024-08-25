import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postjob,
} from "../controllers/job.controller.js";
const router = express.Router();
router.route("/postjob").post(isAuthenticated, postjob);
router.route("/getalljob").get(isAuthenticated, getAllJobs);
router.route("/getadminjob").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;
