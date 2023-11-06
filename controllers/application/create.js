const JobApplication = require("../../models/JobApplication");

const createApplication = async (req, res) => {
  console.log("Creating new application with @createApplication controller");
  const { companyName, position, status, userId, jobUrl, dateApplied } = req.body;

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
    });

    return res.status(200).send({ msg: "Application created successfully", newApplication });
  } catch (error) {
    console.log("The user application, at @createApplication controller, did not succeed");
    return res.status(500).send({ msg: "There was a problem creating the application" });
  }
};

module.exports = createApplication;
