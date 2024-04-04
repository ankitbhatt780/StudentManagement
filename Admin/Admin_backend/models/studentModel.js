const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    startYear: {
      type: String,
      required: true,
    },
    lastYear: {
      type: String,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    Image: {
      type: String,
      default: "images/std.png",
    },
  },
  { timestamps: true }
);
const StudentModel = mongoose.model("Student", StudentSchema);
module.exports = StudentModel;
