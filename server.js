const express = require('express');
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');

const { router: imageRouter } = require('./routers/imageRouter.js');
const { router: authRouter } = require('./routers/authRouter.js');
const { localStrategy, jwtStrategy } = require('./authStrategies');

const { PORT, DATABASE_URL } = require('./config');
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');
// CORS setup
mongoose.connect(DATABASE_URL);
app.use('/public', express.static(__dirname + '/public'));
app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

// Strategies
mongoose.Promise = global.Promise;
passport.use(localStrategy);
passport.use(jwtStrategy);

// Setup routers
app.use('/api/auth/', authRouter);
app.use('/api/entries/', imageRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Export express app
module.exports = {app};
