import express, {Request, Response} from "express";
//const Themes = require("../models/themes");
const middlewares = require("../middlewares");
import {get} from 'lodash';
const {handler} = require("../controller/index");
const mtproto = require('../modules/telegram/tg');

const router = express.Router();

interface SessionRequest extends Request {
  session: any
}

router.post("/telegram", async (req: Request, res: Response) => {
  const nearestDC = await mtproto.mtproto.call('help.getNearestDc')
  res.json({success: true, data: nearestDC})
});

module.exports = router;