const router = require('express').Router();
const { Activity } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new Activity
router.post('/', withAuth, async (req, res) => {
    try {
        const activityData = await Activity.create({
            title: req.body.title,
            description: req.body.description,
            github_link: req.body.github_link,
            deployed_link: req.body.deployed_link,
            image_link: req.body.image_link,
            user_id: req.session.user_id,
        });
        res.status(200).json(activityData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

module.exports = router;