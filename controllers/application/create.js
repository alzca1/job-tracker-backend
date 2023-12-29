const JobApplication = require("../../models/JobApplication");

const createApplication = async (req, res) => {
  console.log("Creating new application with @createApplication controller");
  const {
    companyName,
    position,
    status,
    jobUrl,
    dateApplied,
    minimumExperience,
    educationRequired,
    residenceRequired,
    availabilityRequired,
    salary,
    socialBenefits,
    variable,
  } = req.body;

  const { id: userId, email } = req.user;

  if (!companyName || !position || !userId) {
    console.log(
      "The user application, at @createApplication controller, did not succeed due to missing fields"
    );
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const newApplication = await JobApplication.create({
      companyName: companyName,
      position: position,
      status: status || "pending",
      userId: userId,
      dateApplied: dateApplied || new Date(),
      jobUrl: jobUrl || "",
      minimumExperience: minimumExperience || "",
      educationRequired: educationRequired || "",
      residenceRequired: residenceRequired || "",
      availabilityRequired: availabilityRequired || "",
      salary: salary || "",
      variable: variable || "",
      socialBenefits: socialBenefits || [],
      historic: [{ date: new Date(), content: `${status} status` }],
    });

    return res.status(200).send({ msg: "Application created successfully", newApplication });
  } catch (error) {
    console.log("The user application, at @createApplication controller, did not succeed");
    return res.status(500).send({ msg: "There was a problem creating the application" });
  }
};

module.exports = createApplication;
