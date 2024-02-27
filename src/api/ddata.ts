import express, {NextFunction, Request, Response} from "express";
const Users = require("../models/users");
const middlewares = require("../middlewares");
import {get} from 'lodash'

const router = express.Router();

interface SessionRequest extends Request {
  session: any
}

router.get("/userdata", middlewares.requireAuth, async (req: Request, res: Response) => {

  console.log('DDATA-API-0->', req.query, req.params);

  const themes = await Users.findOne({ where: { id: req.query.user_id } }).catch(
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