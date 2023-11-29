const { ObjectId } = require("mongodb");
const JobApplication = require("../../models/JobApplication");

const updateApplication = async (req, res) => {
  const { id: userId } = req.user;
  const { _id } = req.body;
  const updateData = req.body;

  delete updateData._id;

  if (!userId || !_id) {
    console.log(
      "The user application, at @updateApplication controller, did not succeed due to missing userId and/or _id"
    );
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  console.log(`Updating application with id ${_id} with @updateApplication controller`);

  try {
    const updatedApplication = await JobApplication.findByIdAndUpdate(_id, updateData);

    if (!updatedApplication) {
      console.log(
        "The application with id ${_id} was not found and, therefore, update could not be completed"
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
