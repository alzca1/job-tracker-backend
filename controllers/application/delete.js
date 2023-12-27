const JobApplication = require("../../models/JobApplication");

const deleteApplication = async (req, res) => {
  console.log("Deleting application with @deleteApplication controller");

  const { applicationId } = req.params;
  const { id } = req.user;

  if (!applicationId) {
    console.log("The applicationId was not provided and therefore no application will be deleted");
    return res
      .status(400)
      .json({ msg: "Please provide an applicationId in order to delete an application" });
  }

  try {
    // Comprobar si la application existe y si pertenece al usuario que solicita la eliminación
    const findApplication = await JobApplication.findById(applicationId);

    if (!findApplication) {
      console.log(
        `The application with id ${applicationId} was not found and, therefore, deletion could not be completed`
      );
      return res.status(400).json({ msg: "The application was not found" });
    }
    console.log(findApplication.userId.toString(), id);
    if (findApplication.userId.toString() !== id) {
      console.log("The user does not have permission to delete this application");
      return res
        .status(400)
        .json({ msg: "The user does not have permission to delete this application" });
    }

    const deletedApplication = await findApplication.deleteOne();

    console.log(deletedApplication.$isDeleted());

    if (!deletedApplication.$isDeleted()) {
      console.log(`The application with id ${applicationId} could not be deleted`);
      return res.status(500).json({
        msg: `There was an error while trying to delete the application with id ${applicationId}`,
      });
    }

    console.log(`The application with id ${applicationId} was deleted successfully`);

    return res
      .status(200)
      .json({ msg: `The application with id ${applicationId} was deleted successfully` });
  } catch (error) {
    console.log(`The application with id ${applicationId} could not be deleted`);

    return res.status(500).json({
      msg: `There was an error while trying to delete the application with id ${applicationId}`,
    });
  }
};

module.exports = deleteApplication;
