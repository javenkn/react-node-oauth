require('dotenv');

const router = require('express').Router();
const passport = require('passport');

// authorization login success
router.get('/login/success', (req, res) => {
  console.log(res);
});

// authorization login failed
router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Failed to authenticate',
  });
});

// user logouts
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:3000');
});

// authorizes with github
router.get('/github', passport.authenticate('github'));

// redirects after github authorization
router.get(
  '/github/redirect',
  passport.authenticate('github', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: '/auth/login/failed',
  }),
);

module.exports = router;
