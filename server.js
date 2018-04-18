const express = require('express');
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');

const { router: imageRouter } = require('./routers/imageRouter.js');
const { router: authRouter } = require('./routers/authRouter.js');
const { router: userRouter } = require('./routers/userRouter.js');
const { localStrategy, jwtStrategy } = require('./authStrategies');

const { PORT, DATABASE_URL } = require('./config');
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');
mongoose.connect(DATABASE_URL);

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

mongoose.Promise = global.Promise;
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', userRouter);
app.use('/api/auth/', authRouter);
app.use('/api/entries/', imageRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = {app};
