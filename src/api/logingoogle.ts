import express, {Request, Response} from "express";
import passport from "passport";
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

//test google auth
router.use(require('serve-static')(__dirname + '/../public'));
router.use(
  require('body-parser').urlencoded({ extended: true })
);
// router.use(
//   require('express-session')({
//     secret: process.env.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: true
//   })
// );
router.use(
  require('cookie-session')({
    maxAge: 24 * 60 * 60 * 10000,
    keys: [process.env.COOKIE_KEY]
  })
);
router.use(passport.initialize());
router.use(passport.session());
router.use(require('cors')());

const GoogleStrategy = require('passport-google-oauth20')
  .Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        'http://localhost:5000/auth/google/callback'
    },
    (accessToken: string, refreshToken: string, profile: any, cb: any) => {
      return cb(null, { id: profile.id });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user || null);
});

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = router;