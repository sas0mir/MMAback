import express, {NextFunction, Request, Response} from "express";
const Users = require("../models/users");
const Organizations = require("../models/organizatons");
const Subscriptions = require("../models/subscriptions");
const Themes = require("../models/themes");
const Sources = require("../models/sources");
const Post_types = require("../models/post_types");
const middlewares = require("../middlewares");
import {get} from 'lodash'

const router = express.Router();

interface SessionRequest extends Request {
  session: any
}

router.get("/userdata", middlewares.requireAuth, async (req: Request, res: Response) => {

  let responseData = {
    user: null,
    organization: null,
    subscription: null,
    themes: null
  };

  const user = await Users.findOne({
    where: { id: req.query.user_id }
  }).catch(
    (err: any) => {
      console.log("Error: ", err);
    }
  );

  if (!user)
    return res
      .status(400)
      .json({ message: "Themes not found", success: false });

  if(user) {
    responseData.user = user;
    responseData.organization = await Organizations.findOne({where: {id: user.org}});
    responseData.subscription = await Subscriptions.findOne({where: {id: user.subscription_type}});
    let themes = await Themes.findAll({where: {name: user.themes}});
    if(themes && themes.length) {
      for (let theme of themes) {
        theme.post_types = await Post_types.findOne({where: {id: theme.type}});
        theme.sources = await Sources.findAll({where: {id: theme.source}});
      }
      responseData.themes = themes;
    }
    res.json({success: true, data: responseData})
  }
});

module.exports = router;