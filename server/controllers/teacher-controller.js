const { Teacher} = require("../models");

const teacherController = {
  // get all teachers
  getAllTeachers(req, res) {
    Teacher.find({})
      .then((dbTeacherData) => res.json(dbTeacherData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one teacher by id
  getTeacherById({ params }, res) {
    Teacher.findOne({ _id: params.id })
      .populate("sessions")
      .select("-__v")
      .then((dbTeacherData) => {
        if (!dbTeacherData) {
          res.status(404).json({ message: "No teacher found with this id!" });
          return;
        }
        res.json(dbTeacherData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // createTeacher
  createTeacher({ body }, res) {
    Teacher.create(body)
      .then((dbTeacherData) => res.json(dbTeacherData))
      .catch((err) => res.status(400).json(err));
  },

  // update teacher by id
  updateTeacher({ params, body }, res) {
    Teacher.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbTeacherData) => {
        if (!dbTeacherData) {
          res.status(404).json({ message: "No teacher found with this id!" });
          return;
        }
        res.json(dbTeacherData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete teacher
  deleteTeacher({ params }, res) {
    Teacher.findOneAndDelete({ _id: params.id })
      .then((dbTeacherData) => {
        if (!dbTeacherData) {
          return res
            .status(404)
            .json({ message: "No user found with this id!" });
        }

        // bonus: return Thought.deleteMany({ _id: { $in: dbTeacherData.thoughts } })
      })
      .then(() => {
        res.json({ message: "teacher has been deleted." });
      })
      .catch((err) => res.status(400).json(err));
  },

//   // add friend
//   addFriend({ params }, res) {
//     Teacher.findOneAndUpdate(
//       { _id: params.id },
//       { $addToSet: { friends: params.friendId } },
//       { runValidators: true }
//     )
//       .then((dbTeacherData) => {
//         if (!dbTeacherData) {
//           res.status(404).json({ message: "No user found with this id!" });
//           return;
//         }
//         res.json(dbTeacherData);
//       })
//       .catch((err) => res.status(400).json(err));
//   },

//   // remove friend
//   removeFriend({ params }, res) {
//     Teacher.findOneAndUpdate(
//       { _id: params.id },
//       { $pull: { friends: params.friendId } },
//       { runValidators: true }
//     )
//       .then((dbTeacherData) => {
//         if (!dbTeacherData) {
//           res.status(404).json({ message: "No user found with this id!" });
//           return;
//         }
//         res.json(dbTeacherData);
//       })
//       .catch((err) => res.status(400).json(err));
//   },
};

module.exports = teacherController;
