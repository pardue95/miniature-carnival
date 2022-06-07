const router = require("express").Router();
const {
  getAllSessions,
  addSession,
  getSessionById,
  updateSession,
  removeSession,
  addReaction,
  removeReaction,
} = require("../../controllers/session-controller");
const { route } = require("./teacher-routes");

// /api/sessions
router.route("/").get(getAllSessions);

// /api/sessions/<userId>
router.route("/:teacherId").post(addSession);

// /api/sessions/<sessionId>
router.route("/:sessionId").get(getSessionById).put(updateSession);

// /api/sessions/<userId>/<sessionId>
router.route("/:teacherId/:sessionId").delete(removeSession);

// // /api/sessions/<sessionId>/reactions
// router.route("/:sessionId/reactions").post(addReaction);

// // /api/<sessionId>/reactions/<reactionId>
// router.route("/:sessionId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
