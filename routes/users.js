const router = require('express').Router();
const User = require('../models/user');

// Find All
router.get('/', (req, res) => res.render("user/index"));

router.get('/login', (req, res) => res.render("user/login"));

router.post('/login', (req, res, next) => {
    User.login(req.body);
});

router.get('/signup', (req, res) => res.render("user/signup"));

router.post('/signup', (req, res, next) => {
    User.findEmail(req.body.email)
        .then(user => {
            if (user.length >= 1) {
                res.status(404).send({ err: '이미 존재하는 이메일입니다.' });
            } else {
                User.create(req.body)
                    .then(result => {
                        res.redirect("/users");
                    })
                    .catch(err => res.status(500).send(err));
            }
        });
});


module.exports = router;