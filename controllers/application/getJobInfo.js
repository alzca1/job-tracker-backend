const OpenAi = require("openai");
const fs = require("fs");
const crypto = require("crypto");

const openai = new OpenAi({ apiKey: process.env.OPEN_AI_KEY });
const getJobInfo = async (req, res) => {
  try {
    let uuid = crypto.randomUUID();
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an experienced recruiter whose task is provide a very accurate transcription of a given job offer.",
        },
        {
          role: "user",
          content: `Given the url ${req.body.jobUrl}, transcribe the job description in the following fields in a JSON dict: "jobUrl", "jobPortal", "jobTitle", "jobOverview", "educationRequirements","experienceRequirements", "skillsRequirements", "salary", "benefits", "workHours", "workLocation", "jobDescriptionAndExpectations" and "companyName".`,
        },
      ],
      model: "gpt-3.5-turbo-1106",
      temperature: 0.5,
    });
    let date = Date.now();
    fs.writeFileSync(`${uuid}-${date}`, JSON.stringify(completion));
    console.log(completion);
    res.status(200).send(completion);
  } catch (error) {
    res
      .status(500)
      .send(`There was an error while performing the request to Skynet :D => ${error}`);
    console.log("There was an error while performing the request to Skynet :D");
  }
};

module.exports = getJobInfo;
