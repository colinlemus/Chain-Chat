var db = require('../models');

module.exports = app => {
    app.get('/api/login', (req, res) => {
        db.users.findAll({}).then(dbUsers => {
            res.json(dbUsers);
        });
    });
};