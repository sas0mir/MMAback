import express, {Request, Response} from "express";
const Users = require("../models/users");

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  console.log('REGISTER->', req.body, req.query, req.params);
  const { name, email, password } = req.body;

  const alreadyExistsUser = await Users.findOne({ where: { email } }).catch(
    (err: Error) => {
      console.log("Error: ", err.message);
    }
  );

  if (alreadyExistsUser) {
    return res.status(409).json({ message: "User with email already exists!" });
  }

  const newUser = new Users({ name, email, password });
  const savedUser = await newUser.save().catch((err: Error) => {
    console.log("Error: ", err.message);
    res.status(500).json({ error: "Cannot register user at the moment!" });
  });

  if (savedUser) res.redirect('/login_ssrui');
});

module.exports = router;