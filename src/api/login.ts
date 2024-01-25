import express, {Request, Response} from "express";
const Users = require("../models/users");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

const router = express.Router();

interface SessionRequest extends Request {
  session: any
}

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userWithEmail = await Users.findOne({ where: { email } }).catch(
    (err: any) => {
      console.log("Error: ", err);
    }
  );

  if (!userWithEmail)
    return res
      .status(400)
      .json({ message: "Email or password does not match!" });

  if (userWithEmail.password !== md5(password))
    return res
      .status(400)
      .json({ message: "Email or password does not match!" });

  const jwtToken = jwt.sign(
    { id: userWithEmail.id, email: userWithEmail.email },
    process.env.JWT_SECRET
  );

  if (userWithEmail.password === password) {
    //req.session.token = jwtToken; todo
    res.redirect('/dashboard_ssrui');
  } else {
      res.render('login', { error: 'Invalid username or password' });
  }

  res.json({ message: "Welcome Back!", token: jwtToken });
});

module.exports = router;