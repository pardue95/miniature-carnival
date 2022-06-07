const { Schema, model } = require("mongoose");

const sessionSchema = new Schema(
  {
    coach: { type: String, required: true },
    teacher: [
      {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
    choices: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    duration: {
      type: String,
      required: true,
    },
    cycle: {
      type: String,
      enum: ["Cycle #1", "Cycle #2"],
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Session = model("Session", sessionSchema);

module.exports = Session;
