import express, {Request, Response} from "express";
const Users = require("../models/users");
const md5 = require("md5");

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  
  const { name, email, password } = req.body;

  const alreadyExistsUser = await Users.findOne({ where: { email } }).catch(
    (err: Error) => {
      console.log("Error: ", err.message);
    }
  );

  if (alreadyExistsUser) {
    return res.status(409).json({ message: "User with email already exists!" });
  }

  const newUser = new Users({
    name: name,
    email: email,
    password: md5(password),
    subscription_type: 1,
    subscription_date: new Date(),
    settings: {vidgets: 'default'},
    themes: {favorites: ['dollar']},
  });

  const savedUser = await newUser.save().catch((err: Error) => {
    console.log("Error: ", err.message);
    res.status(500).json({ error: `Cannot register user at the moment! ${err.message}` });
  });
   
  if (savedUser) res.redirect('/login_ssrui');
});

module.exports = router;