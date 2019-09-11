require('dotenv').config();

const router = require('express').Router();
const passport = require('passport');

// authorization login success
router.get('/login/success', (req, res, next) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'User is authenticated.',
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    next();
  }
});

// authorization login failed
router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Failed to authenticate.',
  });
});

// user logouts
router.get('/logout', (req, res) => {
  req.session.destroy();
});

// authorizes with Github
router.get('/github', passport.authenticate('github'));

// After authorizing with Github
router.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: '/auth/login/failed',
  }),
);

module.exports = router;
