const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer:   { type: String, required: true },
  type:     { type: String, enum: ["Technical", "HR"], required: true },
  user:     { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Question", questionSchema);
