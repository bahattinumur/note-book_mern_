const express = require("express");
require("dotenv").config({ path: "./config.env" });
const notesRoute = require("./routes/notes");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use("/api/v1/notes", notesRoute);
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => {
    console.log("The database connection is successful");

    app.listen(process.env.PORT, (req, res) => {
      console.log(`The app is listening on port ${process.env.PORT}.`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
