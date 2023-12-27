const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobApplicationSchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  dateApplied: { type: Date, required: true },
  status: {
    type: String,
    required: true,
    enum: ["pending", "interview", "accepted", "rejected"],
    default: "pending",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobUrl: {
    type: String,
    required: false,
  },
  minimumExperience: {
    type: String,
    required: false,
  },
  educationRequired: {
    type: String,
    required: false,
  },
  residenceRequired: {
    type: String,
    required: false,
  },
  availability: {
    type: String,
    required: false,
  },
  salary: {
    type: String,
    required: false,
  },
  variable: {
    type: String,
    required: false,
  },
  socialBenefits: [String],
  historic: [{ _id: false, date: Date, content: String }],
});

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

module.exports = JobApplication;
