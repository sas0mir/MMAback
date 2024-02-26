import express, {Request, Response} from "express";
//const Themes = require("../models/themes");
const middlewares = require("../middlewares");
import {get} from 'lodash';
const {handler} = require("../controller/index");

const router = express.Router();

interface SessionRequest extends Request {
  session: any
}

router.get("/telegram", async (req: Request, res: Response) => {
  
  handler(req, res)
})
// router.get("/telegram", handler);
//router.post("/telegram", handler);
router.post("/telegram", async (req: Request, res: Response) => {
  handler(req, res)
  // try {
  //   res.json({success: true, message: ''})
  // } catch(err) {
  //   console.log('TG-SEARCH-ERROR->', err)
  //   res.json({success: false, message: err})
  // }
});

module.exports = router;