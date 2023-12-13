const mongoose = require("mongoose");

mongoose
  .connect(mongoURI)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log("error connecting to mongodb", err));

module.exports = mongoose;
