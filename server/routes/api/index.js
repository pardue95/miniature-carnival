const router = require('express').Router();
const teacherRoutes = require('./teacher-routes');
const sessionRoutes = require('./session-routes');

// add users and thoughts to the beginning of their respective routes
router.use('/teacher', teacherRoutes);
router.use('/session', sessionRoutes);

module.exports = router;