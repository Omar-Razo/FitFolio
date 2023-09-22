const router = require('express').Router();
const { User, Activity } = require('../models')

router.get('/users', async (req, res) => {
  try {
    const activityData = await Activity.findAll({
    });

    res.status(200).json(activityData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/users', async (req, res) => {
  try {
    const userData = await User.findAll({
    });

    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
