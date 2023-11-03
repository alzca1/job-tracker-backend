const JobApplication = require("../../models/JobApplication");

const updateApplication = async (req, res) => {
  const { id: userId } = req.user;
  const { applicationId, updateData } = req.body;

  if (!userId || !applicationId) {
    console.log(
      "The user application, at @updateApplication controller, did not succeed due to missing userId and/or applicationId"
    );
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  console.log(`Updating application with id ${applicationId} with @updateApplication controller`);

  try {
    const updatedApplication = await JobApplication.findByIdAndUpdate(applicationId, updateData);

    if (!updatedApplication) {
      console.log(
        "The application with id ${applicationId} was not found and, therefore, update could not be completed"
      );
      return res.status(400).json({ msg: "The application was not found" });
    }

    return res.status(200).send({ msg: "Application updated successfully", updatedApplication });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = updateApplication;
