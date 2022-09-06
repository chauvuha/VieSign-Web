const mongoose = require('mongoose');

const videoSchema = mongoose.Schema(
  {
    content: { type: String, required: true },
    url: { type: String, required: true },
    numberTopic: { type: Number, required: true }, //1
    nameTopic: { type: String, required: true }, // cam xuc
    numberPart: { type: Number, required: true }, //1
    type: { type: Number, required: true }, //1.question, 2.response, 3.word
  },
  { versionKey: false }
);

module.exports = mongoose.model('video', videoSchema);