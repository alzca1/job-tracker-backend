const JobApplication = require("../../models/JobApplication");

const getAllApplications = async (req, res) => {
  const { id: userId } = req.user;

  if (!userId) {
    console.log(
      "The user applications, at @getAllApplications controller, did not succeed due to missing fields"
    );
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  console.log(`Requesting all applications for user ${userId} with @getAllApplications controller`);

  try {
    const applications = await JobApplication.find({ userId });
    res.status(200).send({ data: applications });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ msg: "There was a problem getting all the user's applications @getAllApplications" });
  }
};

module.exports = getAllApplications;
