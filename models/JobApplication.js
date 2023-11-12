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
});

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

module.exports = JobApplication;
