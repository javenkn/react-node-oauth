require('dotenv');

const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const authRoutes = require('./routes/auth.js');

const app = express();
const PORT = 4000;

app.use(
  cookieSession({
    name: 'session',
    keys: [
      /* secret keys */
      process.env.COOKIE_SECRET,
    ],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }),
);

// Passport initialization
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());

/**
 * The user ID is serialized to the session, keeping the amount of data stored
 * within the session small
 */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// When subsequent requests are received, this ID is used to find the user
passport.deserializeUser(function(id, done) {
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
  done(null, id);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:4000/auth/github/callback',
    },
    function(accessToken, refreshToken, profile, cb) {
      // User.findOrCreate({ githubId: profile.id }, function(err, user) {
      //   return cb(err, user);
      // });
      console.log(accessToken, refreshToken, profile, cb);
      return cb(err, profile);
    },
  ),
);

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  }),
);

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
