const router = require('express').Router();
const { Activity } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all Activities
router.get('/', async (req, res) => {
    try {
        const Activities = await Activity.findAll();
        res.status(200).json(Activities);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Get one Activity
router.get('/:id', async (req, res) => {
    try {
        const Activity = await Activity.findByPk(req.params.id);
        res.status(200).json(Activity);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Create new Activity
router.post('/', async (req, res) => {
    try {
        const Activity = await Activity.create({
            title: req.body.title,
            description: req.body.description,
            github_link: req.body.github_link,
            deployed_link: req.body.deployed_link,
            image_link: req.body.image_link,
            user_id: req.session.user_id,
        });
        res.status(200).json(Activity);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Update existing Activity
router.put('/:id', async (req, res) => {
    try {
        const Activity = await Activity.update(
            {
                title: req.body.title,
                description: req.body.description,
                github_link: req.body.github_link,
                deployed_link: req.body.deployed_link,
                image_link: req.body.image_link,
                user_id: req.session.user_id,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json(Activity);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Delete existing Activity
router.delete('/:id', async (req, res) => {
    try {
        const Activity = await Activity.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(Activity);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

module.exports = router;