import express, {NextFunction, Request, Response} from "express";
const Themes = require("../models/themes");
const middlewares = require("../middlewares");
import {get} from 'lodash'

const router = express.Router();

interface SessionRequest extends Request {
  session: any
}

router.post("/ddata", middlewares.requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  const { name, return_to } = req.body;

  console.log('DDATE-API-BODY->', name);

  const themes = await Themes.findOne({ where: { name: name } }).catch(
    (err: any) => {
      console.log("Error: ", err);
    }
  );

  if (!themes)
    return res
      .status(400)
      .json({ message: "Themes not found", success: false });
    
  res.json({success: true, data: themes})
});

module.exports = router;