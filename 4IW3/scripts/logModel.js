const mongoose = require("mongoose");

mongoose
  .connect("mongodb://root:password@localhost/app", {
    authSource: "admin",
  })
  .then(() => console.log("Mongoose connected"));

const LogSchema = new mongoose.Schema({
  _id: Number,
  ip: String,
  date: Date,
  request: {
    method: String,
    path: String,
  },
  response: {
    status: Number,
  },
});

const LogModel = new mongoose.model("Log", LogSchema);
LogModel.connection = mongoose.connection;
module.exports = LogModel;
