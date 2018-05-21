const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

module.exports.register = (req, res) => {
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save((err) => {
        const token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });
    });
};


module.exports.login = (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        var token;

        if (err) {
            res.status(404).json(err);
            return;
        }

        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            res.status(401).json(info);
        }
    })(req, res);
};


