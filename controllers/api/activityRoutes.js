const router = require('express').Router();
const { Activity } = require('../../models');
const withAuth = require('../../utils/auth');


// Create new Activity
router.post('/', withAuth, async (req, res) => {
    try {
        const activityData = await Activity.create({
            activity_type: req.body.activity_type,
            duration: req.body.duration,
            user_id: req.session.user_id,
        });
        res.status(200).json(activityData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

module.exports = router;