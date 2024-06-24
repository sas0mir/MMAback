import passport from "passport";
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const Users = require("../models/users");

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload: any, done: any) {
      return Users.findOne({ where: { id: jwtPayload.id } })
        .then((user: any) => {
          return done(null, user);
        })
        .catch((err: Error) => {
          return done(err);
        });
    }
  )
);