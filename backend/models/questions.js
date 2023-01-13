const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    topic: { type: Number, required: true },
    listQuestion: [
      {
        question: { type: String, required: false },
        answer: { type: Array, required: false },
        _id: false
      },
    ],
  },
  { versionKey: false }
);

module.exports = mongoose.model("questions", questionSchema);
