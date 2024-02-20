import express, {NextFunction, Request, Response} from "express";
const Users = require("../models/users");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
import {get, set} from 'lodash'

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
      //req.session.user = {...userWithEmail, token: jwtToken};
      // set(req.session, 'user', {
      //   ...userWithEmail,
      //   token: jwtToken
      // })
      req.session.save((err) => {
        if(err) return next(err)
        res.json({success: true, token: jwtToken, user: userWithEmail})
      })
    })
    console.log('LOGIN-SUCCESS->', get(req, 'session'), req.sessionID);
  } else {
    res.json({success: false, message: 'Пароль не верен'})
  }
});

router.get('/logout', async (req: Request, res: Response) => {
  req.session.destroy(function(err) {
    if(err) {
      console.log('LOGOUT-ERROR->', err);
      res.json({success: false, message: err})
    } else res.json({success: true, message: 'logout success'})
  });
  //set(req.session, 'user', null);
  // try {
  //   req.session.save(function (err) {
  //     if (err) throw new Error(err)
  //     req.session.regenerate(function (err) {
  //       if (err) throw new Error(err)
  //       // res.redirect('/login')
  //     res.json({success: true, message: 'logout success'})
  //     })
  //   })
  // } catch(err) {
  //   console.log('LOGOUT-ERROR->', err);
  //   res.json({success: false, message: err})
  // }
})

module.exports = router;