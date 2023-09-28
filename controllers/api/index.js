const router = require('express').Router();
const userRoutes = require('./userRoutes');
const activityRoutes = require('./activityRoutes');
const dailyLogRoutes = require('./dailyLogRoutes');

router.use('/users', userRoutes);
router.use('/activity', activityRoutes)
router.use('/dailylog', dailyLogRoutes)

module.exports = router;
