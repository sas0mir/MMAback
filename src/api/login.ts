import express, {NextFunction, Request, Response} from "express";
const Users = require("../models/users");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
import {get} from 'lodash'

const router = express.Router();

interface SessionRequest extends Request {
  session: any
}

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, return_to } = req.body;

  console.log('LOGIN-API-BODY->', email, password, req.body, req.query, req.params);

  const userWithEmail = await Users.findOne({ where: { email } }).catch(
    (err: any) => {
      console.log("Error: ", err);
    }
  );

  if (!userWithEmail)
    return res
      .status(400)
      .json({ message: "Email or password does not match!", success: false });

  if (userWithEmail.password !== md5(password))
    return res
      .status(400)
      .json({ message: "Email or password does not match!", success: false });

  const jwtToken = jwt.sign(
    { id: userWithEmail.id, email: userWithEmail.email },
    process.env.JWT_SECRET
  );

  if (userWithEmail.password === md5(password)) {
    req.session.regenerate((err) => {
      if(err) next(err)

      //req.session.token = jwtToken
      req.session.save((err) => {
        if(err) next(err)
        //res.redirect(`${process.env.FRONT_URL}/${return_to}` || '/dashboard_ssrui');
        res.json({success: true, token: jwtToken, user: userWithEmail})
      })
    })
    console.log('LOGIN-SUCCESS->', get(req, 'session'), req.sessionID);
  } else {
    res.json({success: false, message: 'Пароль не верен'})
      //res.render('login', { title: 'Login error', message: 'Invalid username or password' });
  }

  //res.json({ message: "Welcome Back!", token: jwtToken, user: userWithEmail });
});

router.get('/logout', async (req: Request, res: Response, next: NextFunction) => {
  // logout logic

  // clear the user from the session object and save.
  // this will ensure that re-using the old session id
  // does not have a logged in user
  //req.session.user = null
  req.session.save(function (err) {
    if (err) next(err)

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err)
      res.redirect('/')
    })
  })
})

module.exports = router;