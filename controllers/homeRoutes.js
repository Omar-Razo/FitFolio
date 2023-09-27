const router = require('express').Router();
const { User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
      const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
          include: [{ model: DailyLog, Activity }],
      });
      console.log("rawData", userData)

      const user = userData.map((data) => data.get({ plain: true }));
      console.log("serialized data", user)

      res.render('dashboard', { 
          ...user, 
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