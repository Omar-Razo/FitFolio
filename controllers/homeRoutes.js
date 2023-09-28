const router = require('express').Router();
const { User, DailyLog, Activity } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
      const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
          include: [{ model: DailyLog, Activity }],
      });

      const userStats = userData.map((user) => user.get({ plain: true }))

      res.status(200).json(userStats);
      res.render('dashboard', { 
        userStats, 
        logged_in: req.session.logged_in 
      });
  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
      const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
          include: [{ model: DailyLog, Activity }],
      });

      const userStats = userData.map((user) => user.get({ plain: true }))

      res.status(200).json(userStats);
      res.render('dashboard', { 
        userStats, 
        logged_in: req.session.logged_in 
      });
  } catch (err) {
      res.status(500).json(err);
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