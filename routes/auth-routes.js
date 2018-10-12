var db = require('../models');

module.exports = (app, passport) => {
    app.post('/api/login',
        passport.authenticate('local-signin', {
            successRedirect: '/',
            failureRedirect: '/',
        })
    );
    // app.post('/api/login', (req, res) => {
    //     db.users.findOne({
    //         where: {
    //             username: req['body']['username']
    //         }
    //     }).then(dbUserData => {
    //         res.json(dbUserData);
    //     });
    // });
}