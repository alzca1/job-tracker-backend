const JobApplication = require("../../models/JobApplication");

const getApplication = async (req, res) => {
  const { id: userId } = req.user;
  const { applicationId } = req.params;

  if (!userId) {
    console.log(
      "The user application, at @getApplication controller, did not succeed due to missing userId"
    );
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  console.log("Requesting application with @getApplication controller");

  try {
    const application = await JobApplication.findById(applicationId).select(
      "jobUrl minimumExperience educationRequired residenceRequired availabilityRequired languagesRequired  salary  variable  socialBenefits  historic"
    );

    if (!application) {
      console.log(
        "The application with id ${applicationId} was not found and, therefore, get could not be completed"
      );

      return res.status(204).json({ msg: "The application was not found" });
    }
    return res.status(200).send(application);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = getApplication;
