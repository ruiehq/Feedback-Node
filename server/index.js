const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const mongoose = require('mongoose');

/* Requires */
const keys = require('./keys');
require('./models/User');

/* Initialize Server */
const app = express();

const User = mongoose.model('user');
mongoose.connect(keys.mlabURL, { useMongoClient: true });
mongoose.Promise = global.Promise;

/* Middleware Requires */
require('./services/passport');

/* Routes */
app.get('/', (req, res) => {
  res.send({ Welcome: 'hi' });
});

app.get('/auth/google', passport.authenticate('google', {
   scope: ['email', 'profile']
}));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }));

app.get('/api/current_user', (req, res) => {
   res.send({ user: 'test' });
})


/* Run Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server is running on PORT:${PORT}`);
});