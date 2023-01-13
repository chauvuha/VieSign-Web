const Question = require("../models/questions");

exports.updateQuestions = (req, res) => {
  Question.updateOne(
    { topic: req.body.topic },
    { listQuestion: req.body.listQuestion }
  )
    .then(() => {
      res.status(200).json({
        message: "update questions successfully",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.createQuestions = (req, res) => {
  const question = new Question({
    topic: req.body.topic,
    listQuestion: req.body.listQuestion,
  });
  question
    .save()
    .then(() => {
      res.status(201).json({
        message: "create question successfully",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllQuestions = (req, res) => {
  Question.find({})
    .then((questions) => {
      res.status(200).json({
        message: "get all questions successfully",
        questions: questions,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getQuestionsByTopic = (req, res) => {
  Question.find({ topic: req.query.topic })
    .then((questions) => {
      res.status(200).json({
        message: "get questions by topic successfully",
        questions: questions,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deleteQuestion = (req, res) => {
  Question.deleteOne({ _id: req.query._id })
    .then(() => {
      res.status(200).json({
        message: "delete questions by topic successfully",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
