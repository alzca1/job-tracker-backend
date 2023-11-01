require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const mainRouter = require("./routes/main");
const connectDB = require("./db/connect");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h1>Job Tracker API</h1>");
});
app.use("/api/v1", mainRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Successfully connected to database!");
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Error starting server", error);
  }
};

start();
