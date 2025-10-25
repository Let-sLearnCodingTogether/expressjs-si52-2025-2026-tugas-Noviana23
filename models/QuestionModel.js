import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Technical", "HR"],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // otomatis menambahkan createdAt & updatedAt
  }
);

const QuestionModel = mongoose.model("Question", questionSchema);

export default QuestionModel;
