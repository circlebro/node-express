const express = require("express");
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');

// Find All
router.get('/', (req, res) => res.render("user/index"));

//router.get('/login', (req, res) => res.render("user/login"));

router.get('/signup', (req, res) => res.render("user/signup"));

router.post('/signup', (req, res, next) => {
    console.log(req.body);
    User.find({ email:req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                res.send('<script type="text/javascript">alert("이미 존재하는 이메일입니다."); window.location="/signup"; </script>');
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    name:req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                user
                    .save()
                    .then(result => {
                        console.log(result);
                        res.redirect("/");
                    })
                    .catch(err => {
                        console.log(err);
                    });
                  }
        });
});


module.exports = router;