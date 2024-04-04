const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const  FeesSchema = new mongoose.Schema(
    {

    stdId: {
        type: mongoose.Types.ObjectId,
        required: true,
      },

     fees: {
        type: Number,
        required: true,
      },
    },
      { timestamps: true }
)

const FeesModel = mongoose.model("fees", FeesSchema);
module.exports = FeesModel;