const db = require('../models');
const jwt = require('jsonwebtoken');
const bCrypt = require('bcrypt-nodejs');
const EMAIL_SECRET = '1uK1ELJem9bczpBQ74xk';

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
        if (req.session.user) {
            return res.json(req.session.user)
        } else {
            return res.sendStatus(401);
        }
    });

    app.get('/confirmation/:token', (req, res) => {
        const { newUser: { id } } = jwt.verify(req.params.token, EMAIL_SECRET);

        db.users.update({ active: true }, { where: { id } })
            .then(res => {
                return res.json({
                    verified: true
                });
            })
            .catch(err => {
                return err;
            });
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
        const createHashedPassword = (enteredSignUpPassword) => {
            return bCrypt.hashSync(enteredSignUpPassword, bCrypt.genSaltSync(12), null);
        };

        const generatedHashPassword = createHashedPassword(req.body.password);

        db.users.findOne({
            where: {
                username: req.session.user.username
            }
        }).then(user => {
            db.users.update({ password: generatedHashPassword }, { where: { id: user.id } });

            req.session.user = {
                id: user.id,
                username: user.username,
                password: user.password,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                factorAuth: user.factorAuth,
                active: user.active
            };

            req.session.save((err) => {
                if (err) {
                    console.log(err);
                    return;
                }

                return res.redirect('../');
            });
        });
    });


    app.get('/forgot/:token', (req, res) => {
        const { user } = jwt.verify(req.params.token, EMAIL_SECRET);

        req.session.user = user;
        req.session.save((err) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.redirect('../change');
        });
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