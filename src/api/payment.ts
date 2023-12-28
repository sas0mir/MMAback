import express, {Request, Response} from "express";
const passport = require("passport");

const router = express.Router();

router.get(
  "/payment",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
    res.send("You have a total of: 2400$");
  }
);

module.exports = router;