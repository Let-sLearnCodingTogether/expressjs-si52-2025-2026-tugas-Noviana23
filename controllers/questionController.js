import QuestionModel from "../models/questionModel.js";

export const createQuestion = async (req, res) => {
  try {
    const { question, answer, type } = req.body;

    const newQuestion = await QuestionModel.create({
      question,
      answer,
      type,
      user: req.user.id, 
    });

    res.status(201).json({
      message: "Pertanyaan berhasil dibuat",
      data: newQuestion,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await QuestionModel.find({ user: req.user.id });

    res.status(200).json({
      message: "Data pertanyaan berhasil diambil",
      data: questions,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const question = await QuestionModel.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!question) {
      return res.status(404).json({
        message: "Pertanyaan tidak ditemukan",
        data: null,
      });
    }

    res.status(200).json({
      message: "Data pertanyaan berhasil ditemukan",
      data: question,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await QuestionModel.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({
        message: "Pertanyaan tidak ditemukan",
        data: null,
      });
    }

    res.status(200).json({
      message: "Pertanyaan berhasil diperbarui",
      data: updatedQuestion,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await QuestionModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deletedQuestion) {
      return res.status(404).json({
        message: "Pertanyaan tidak ditemukan",
        data: null,
      });
    }

    res.status(200).json({
      message: "Pertanyaan berhasil dihapus",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};
