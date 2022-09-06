const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: Number, required: true },
    dob: { type: String, required: true },
    url: { type: String, required: false },
    country: { type: String, required: false },
    city: { type: String, required: false },
    address: { type: String, required: false },
    zipcode: { type: Number, required: false },
    phone: { type: String, required: false },
    score: { type: Number, required: true },
    topic: { type: Number, required: true },
    part: { type: Number, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
