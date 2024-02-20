import express, {Request, Response} from "express";
//const Themes = require("../models/themes");
const middlewares = require("../middlewares");
import {get} from 'lodash'

const router = express.Router();

interface SessionRequest extends Request {
  session: any
}

router.post("/tg_search", middlewares.requireAuth, async (req: Request, res: Response) => {
  const { keyword, groupId } = req.body;

  console.log('TG-SEARCH-API-BODY->', name);

  try {
    res.json({success: true, message: ''})
  } catch(err) {
    console.log('TG-SEARCH-ERROR->', err)
    res.json({success: false, message: err})
  }
});

module.exports = router;