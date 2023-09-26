const router = require('express').Router();
const { User } = require('../../models');

//Create new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            height: req.body.height,
            weight: req.body.weight,
            age: req.body.age
        });
        res.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err); 
        res.status(500).json(err);
    };
});

// Login existing user
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ 
            where: { email: req.body.email },
        });
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        } 
        
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logout existing user
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Edit existing user
router.put('/:id', async (req, res) => {
    try {
        const userData = await User.update(
            {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
    res.status(200).json(userData);
});

// Delete existing user
router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
    if (!userData) {
        res.status(404).json({ message: 'No user found with that id!' });
        return;
    }
    res.status(200).json(userData);
});

module.exports = router;