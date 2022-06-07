const { Schema, model } = require("mongoose");

const TeacherSchema = new Schema(
  {
    teacherName: {
      type: String,
      required: "Name is Required",
      trim: true,
    },

    district: {
      type: String,
      required: "District is Required",

    },

    campus: {
      type: String,
      required: "Campus is Required",

    },

    ssin: {
      type: String,
      required: "SSIN is Required",
      unique: true,
    },

    sessions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Sessions",
      },
    ],

    // friends: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// // get total count of friends
// UserSchema.virtual("friendCount").get(function () {
//   return this.friends.length;
// });

const Teacher = model("Teacher", TeacherSchema);

module.exports = Teacher;
