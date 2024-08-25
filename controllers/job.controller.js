import { Job } from "../models/job.model.js";
export const postjob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salery,
      location,
      jobType,
      experience,
      positions,
      companyId,
    } = req.body;
    console.log(
      title,
      description,
      requirements,
      salery,
      location,
      jobType,
      experience,
      positions,
      companyId
    );

    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salery ||
      !location ||
      !jobType ||
      !experience ||
      !positions ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salery: Number(salery),
      location,
      jobType,
      experiencelevel: experience,
      positions,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "New Job Created Succefully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdBy: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "job found",
      job,
      success: false,
    });
  } catch (error) {
    console.log(error);
  }
};
//admin
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
