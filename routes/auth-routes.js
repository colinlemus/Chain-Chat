var db = require('../models');
var jwt = require('jsonwebtoken');
var bCrypt = require('bcrypt-nodejs');

var EMAIL_SECRET = '1uK1ELJem9bczpBQ74xk';

module.exports = (app, passport) => {
    app.post('/api/login', (req, res, next) => {
        return passport.authenticate('local-signin', (err, token, userData) => {
            if (err) {
                if (err.name === 'IncorrectCredentialsError') {
                    return res.status(400).json({
                        success: false,
                        message: err.message
                    });
                }

                return res.status(400).json({
                    success: false,
                    message: 'Could not process the form.'
                });
            }

            return res.json({
                success: true,
                message: 'You have successfully logged in!',
                token,
                user: userData
            });
        })(req, res, next);
    });

    app.post('/api/signup',
        passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/signup'
        })
    );

    app.get('/api/session', (req, res) => {
        console.log(req.session);
        if (req.session.user) {
            return res.json(req.session.user)
        } else {
            return res.sendStatus(401);
        }
    });

    app.get('/confirmation/:token', (req, res) => {
        var { newUser: { id } } = jwt.verify(req.params.token, EMAIL_SECRET);

        db.users.update({ active: true }, { where: { id } });
    });

    app.post('/api/forgot', (req, res, next) => {
        return passport.authenticate('local-forgot', (err, token, userData) => {
            if (err) {
                if (err.name === 'IncorrectCredentialsError') {
                    return res.status(400).json({
                        success: false,
                        message: err.message
                    });
                }

                return res.status(400).json({
                    success: false,
                    message: 'Could not process the form.'
                });
            }

            return res.json({
                success: true,
                message: 'User has been found.',
                token,
                user: userData
            });
        })(req, res, next);
    });

    app.post('/api/newPass', (req, res, next) => {
        var createHashedPassword = (enteredSignUpPassword) => {
            return bCrypt.hashSync(enteredSignUpPassword, bCrypt.genSaltSync(12), null);
        };

        var generatedHashPassword = createHashedPassword(req.body.password);

        db.users.findOne({
            where: {
                username: req.session.user[0].username
            }
        }).then(user => {
            db.users.update({ password: generatedHashPassword }, { where: { id: user.id } });

            req.session.destroy();
            req.session.user = user;
            req.session.save();
        });
    });


    app.get('/forgot/:token', (req, res) => {
        var { user: { username } } = jwt.verify(req.params.token, EMAIL_SECRET);

        req.session.destroy();
        req.session.user = {
            username
        }
        req.session.save();

        res.sendFile(path.join(__dirname, 'public', 'build', 'index.html'));
    });

    app.post('/api/factorAuth', (req, res, next) => {
        return passport.authenticate('local-factor', (err, token, userData) => {
            if (err) {
                if (err.name === 'IncorrectCredentialsError') {
                    return res.status(400).json({
                        success: false,
                        message: err.message
                    });
                }

                return res.status(400).json({
                    success: false,
                    message: 'Could not process the form.'
                });
            }

            return res.json({
                success: true,
                message: 'User has been found.',
                token,
                user: userData
            });
        })(req, res, next);
    });

}