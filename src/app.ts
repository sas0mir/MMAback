const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./auth/passport");

require("./models/user");

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.all('/secret', function(req: Request, res: Response, next: any) {
    //todo
    //req.requestTime = Date.now();
    next()
  });
  
  app.use(bodyParser());
  
  app.set('views', './views');
  app.set('view engine', 'pug');
  
  app.get('/test_template', function(req: Request, res: Response) {
    res.render('testpage', {title: 'Testing', message: 'Template render success'});
  });

  
//test google auth
app.use(require('serve-static')(__dirname + '/../public'));
app.use(
  require('body-parser').urlencoded({ extended: true })
);
// app.use(
//   require('express-session')({
//     secret: process.env.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: true
//   })
// );
app.use(
  require('cookie-session')({
    maxAge: 24 * 60 * 60 * 10000,
    keys: [process.env.COOKIE_KEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(require('cors')());

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
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, { id: profile.id });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/gg', (req, res) => {
  console.log(req.session);
  res.send('gg');
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;