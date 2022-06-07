const router = require("express").Router();

const {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  addFriend,
  removeFriend,
} = require("../../controllers/teacher-controller");

// Set up GET all and POST at /api/teachers
router.route("/").get().post();

// /api/teachers/:id
router.route("/:id").get(getTeacherById).put(updateTeacher).delete(deleteTeacher);

// // /api/teachers/:teacherId/friends/:friendId
// router.route("/:id/friends/:friendId").post(addFriend).delete(removeFriend);

// /api/teachers
router.route("/").get(getAllTeachers).post(createTeacher);

module.exports = router;
