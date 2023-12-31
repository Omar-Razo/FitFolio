const router = require('express').Router();
const { User, DailyLog, Activity } = require('../../models');
const withAuth = require('../../utils/auth');

//Create new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            height: req.body.height,
            weight: req.body.weight,
            age: req.body.age,
            gender: req.body.gender,
            role: 'user'
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.role = userData.role
            res.status(200).json({ 
                user: userData, 
                message: 'You are now registered!',
                redirectUrl: '/dashboard'
            });
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
            req.session.role = userData.role
            res.status(200).json({ 
                user: userData, 
                message: 'You are now logged in!',
            });
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



module.exports = router;