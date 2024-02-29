import express, {Request, Response} from "express";
const Users = require("../models/users");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  
  const { name, email, password } = req.body;

  const alreadyExistsUser = await Users.findOne({ where: { email } }).catch(
    (err: Error) => {
      console.log("Error: ", err.message);
    }
  );

  if (alreadyExistsUser) {
    return res.json({success: false, message: 'Пользователь с таким email уже существует'})
  }

  const newUser = new Users({
    name: name,
    email: email,
    password: md5(password),
    subscription_type: 1,
    subscription_date: new Date(),
    settings: {vidgets: 'default'},
    themes: ['news'],
  });

  const savedUser = await newUser.save().catch((err: Error) => {
    console.log("Error: ", err.message);
    res.status(500).json({ success: false, message: `Cannot register user at the moment! ${err.message}` });
  });
   
  if (savedUser) {
    const jwtToken = jwt.sign(
      { id: savedUser.id, email: savedUser.email },
      process.env.JWT_SECRET
    );
    res.json({success: true, message: `Добро пожаловать ${savedUser.name}`, token: jwtToken, user: savedUser})
  }
});

module.exports = router;