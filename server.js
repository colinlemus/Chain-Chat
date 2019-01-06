require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const database = require('./models');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 63453;
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

require('./config/sqlSession.js')(app);
app.use(passport.initialize());
app.use(passport.session());
app.use('/static', express.static(path.join(__dirname, 'public/build/static')));
require('./routes/api-routes.js')(app);
require('./routes/auth-routes.js')(app, passport);
require('./config/passport.js')(passport, database);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'build', 'index.html'));
});

database.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('App listening on PORT ' + PORT);
    });
});