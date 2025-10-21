const Question = require("../models/Question");

exports.createQuestion = async (req, res) => {
  try {
    const { question, answer, type } = req.body;
    const newQuestion = await Question.create({
      question,
      answer,
      type,
      user: req.user.id
    });
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ user: req.user.id });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findOne({ _id: req.params.id, user: req.user.id });
    if (!question) return res.status(404).json({ message: "Not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!question) return res.status(404).json({ message: "Not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!question) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
