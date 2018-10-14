var db = require('../models');
var express = require('express');
var router = express.Router();

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

    app.post('/api/signup', (req, res, next) => {
        return passport.authenticate('local-signup', (err, token, userData) => {
            console.log(userData);
            console.log(token);
            // if (err) {
            //     if (err.name === 'IncorrectCredentialsError') {
            //         return res.status(400).json({
            //             success: false,
            //             message: err.message
            //         });
            //     }

            //     return res.status(400).json({
            //         success: false,
            //         message: 'Could not process the form.'
            //     });
            // }

            // return res.json({
            //     success: true,
            //     message: 'You have successfully logged in!',
            //     token,
            //     user: userData
            // });
        })(req, res, next);
    });
}