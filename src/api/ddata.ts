import express, {NextFunction, Request, Response} from "express";
const Users = require("../models/users");
const Organizations = require("../models/organizatons");
const Subscriptions = require("../models/subscriptions");
const Themes = require("../models/themes");
const Sources = require("../models/sources");
const Platform = require("../models/platforms");
const Journal = require("../models/journal");
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
    platforms: null,
    themes: null,
    sources: null,
    journal: null
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
      .json({ message: "Пользователь не найден", success: false });

  if(user) {
    if (user.themes && user.themes.length) {
      responseData.themes = await Themes.findAll({where: {id: user.themes}})
    }
    if (user.sources && user.sources.length) {
      responseData.sources = await Sources.findAll({where: {id: user.sources}})
    }
    responseData.user = user;
    responseData.organization = await Organizations.findOne({where: {id: user.org}});
    responseData.subscription = await Subscriptions.findOne({where: {id: user.subscription_type}});
    responseData.platforms = await Platform.findAll();
    responseData.journal = await Journal.findAll({where: {user: req.query.user_id}, limit: 50})

    res.json({success: true, data: responseData, message: 'Данные пользователя успешно загружены'})
  }
});

module.exports = router;