const router = require('express').Router();
const { User, DailyLog, Activity } = require('../models');
const withAuth = require('../utils/auth');

// default route
router.get('/', withAuth, async (req, res) => {
  try {
      const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
          include: [{ model: DailyLog, Activity }],
      });

      const userStats = userData.get({ plain: true })

      
      res.render('dashboard', { 
        userStats, 
        logged_in: req.session.logged_in 
      });
  } catch (err) {
      res.status(500).json(err);
      console.log(err)
  }
});

// dashboard route (once user is logged in, redirects)
router.get('/dashboard', withAuth, async (req, res) => {
  try {
      const currentDate = new Date().toISOString().slice(0, 10);
      // gather User Data
      const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
      });
      // serialize User Data
      const user = userData.get({ plain: true })
      console.log(user)

      // gather Activity Data
      const activityData = await Activity.findAll({
        where: {
          user_id: req.session.user_id
        },
        order: [['createdAt', 'DESC']],
      })
      // serialize Activity Data
      const activities = activityData.map((acvitiy) => acvitiy.get({ plain: true }));

      // gather DailyLog Data
      const logData = await DailyLog.findOne({ 
        where: { date_created: currentDate , user_id: req.session.user_id 
      }})

      let dailylog;
      // create DailyLog if it does not exist
      if (!logData) {
        const logData = await DailyLog.create({ date_created: currentDate, user_id: req.session.user_id });

        dailylog = logData.get({ plain:true })
      } else{
        dailylog = logData.get({ plain:true })
        console.log(dailylog)
      }

      res.render('dashboard', { 
        user,
        activities,
        dailylog,
        logged_in: req.session.logged_in 
      });
  } catch (err) {
      res.status(500).json(err);
      console.log(err)
  }
});

// redirects to login if not logged in
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login-signup');
});

module.exports = router; 