const router = require('express').Router();
const { Project } = require('../../models');

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.status(200).json(projects);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Get one project
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        res.status(200).json(project);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Create new project
router.post('/', async (req, res) => {
    try {
        const project = await Project.create({
            title: req.body.title,
            description: req.body.description,
            github_link: req.body.github_link,
            deployed_link: req.body.deployed_link,
            image_link: req.body.image_link,
            user_id: req.session.user_id,
        });
        res.status(200).json(project);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Update existing project
router.put('/:id', async (req, res) => {
    try {
        const project = await Project.update(
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
        res.status(200).json(project);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Delete existing project
router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(project);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

module.exports = router;