var db = require('../models');
var jwt = require('jsonwebtoken');

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
        const { newUser: { id } } = jwt.verify(req.params.token, EMAIL_SECRET);

        db.users.update({ active: true }, { where: { id } });
    });
}