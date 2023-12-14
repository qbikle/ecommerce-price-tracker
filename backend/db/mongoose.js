const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URL;

mongoose
  .connect(mongoURI)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log("error connecting to mongodb", err));

module.exports = mongoose;
