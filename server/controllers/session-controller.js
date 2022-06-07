const Session = require("../models/sessions");
const Teacher = require("../models/teacher");

const sessionController = {
  // get all sessions
  getAllSessions(req, res) {
    Session.find({})
      // .populate('reactionId')
      .then((dbSessionData) => res.json(dbSessionData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one teacher by id
  getSessionById({ params }, res) {
    Session.findOne({ _id: params.sessionId })
      .then((dbSessionData) => {
        if (!dbSessionData) {
          res.status(404).json({ message: "No session found with this id!" });
          return;
        }
        res.json(dbSessionData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // add session to teacher
  addSession({ params, body }, res) {
    console.log(body);
    Session.create(body)
      .then(({ _id }) => {
        return Teacher.findOneAndUpdate(
          { _id: params.teacherId },
          { $push: { sessions: _id } },
          { new: true }
        );
      })
      .then((dbTeacherData) => {
        if (!dbTeacherData) {
          res.status(404).json({ message: "No teacher found with this id!" });
          return;
        }
        res.json(dbTeacherData);
      })
      .catch((err) => res.json(err));
  },

  // update session by id
  updateSession({ params, body }, res) {
    Session.findOneAndUpdate({ _id: params.sessionId }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbSessionData) => {
        if (!dbSessionData) {
          res.status(404).json({ message: "No session found with this id!" });
          return;
        }
        res.json(dbSessionData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // remove session
  removeSession({ params }, res) {
    Session.findOneAndDelete({ _id: params.sessionId })
      .then((deletedSession) => {
        if (!deletedSession) {
          return res.status(404).json({ message: "No session with this id!" });
        }
        return Teacher.findOneAndUpdate(
          { _id: params.teacherId },
          { $pull: { sessions: params.sessionId } },
          { new: true }
        );
      })
      .then((dbTeacherData) => {
        if (!dbTeacherData) {
          res.status(404).json({ message: "No teacher found with this id!" });
          return;
        }
        res.json(dbTeacherData);
      })
      .catch((err) => res.json(err));
  },

  // add reaction
  addReaction({ params, body }, res) {
    Session.findOneAndUpdate(
      { _id: params.sessionId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbSessionData) => {
        if (!dbSessionData) {
          return res
            .status(404)
            .json({ message: "No session found with this id!" });
        }
        res.json(dbSessionData);
      })
      .catch((err) => res.json(err));
  },

  // remove reaction
  removeReaction({ params }, res) {
    console.log(params.sessionId, params.reactionId);
    Session.findOneAndUpdate(
      { _id: params.sessionId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbTeacherData) => res.json(dbTeacherData))
      .catch((err) => res.json(err));
  },
};

module.exports = sessionController;
