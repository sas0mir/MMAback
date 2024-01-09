import express, {Request, Response} from "express";
const Users = require("../models/users");
const jwt = require("jsonwebtoken");

const router = express.Router();

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

  if (userWithEmail.password !== password)
    return res
      .status(400)
      .json({ message: "Email or password does not match!" });

  const jwtToken = jwt.sign(
    { id: userWithEmail.id, email: userWithEmail.email },
    process.env.JWT_SECRET
  );

  res.json({ message: "Welcome Back!", token: jwtToken });
});

module.exports = router;