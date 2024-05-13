import express, {NextFunction, Request, Response} from "express";
import { telegram_scraper } from "telegram-scraper";
const Users = require("../models/users");
const Themes = require("../models/themes");
const Sources = require("../models/sources");
const Authors = require("../models/authors");
const middlewares = require("../middlewares");
import {get} from 'lodash'

const router = express.Router();

interface SessionRequest extends Request {
  session: any
}

router.get('/load_posts', middlewares.requireAuth, async (req: Request, res: Response) => {
  const { user_id } = req.query;

  const user = await Users.findOne({where: {id: user_id}}).catch(
    (err: any) => {
      console.log("USER-FIND-ERR->", err);
    }
  );

  const sources = await Sources.findAll({where: {id: user.sources}}).catch(
    (err: any) => {
      console.log("SOURCES-FIND-ERR->", err);
    }
  );

  if(!sources || sources && !sources.length) {
    return res.json({success: false, data: sources, errTitle: 'Добавьте источники', message: 'Не найдены источники для загрузки ленты'})
  } else {
    //let postsArr: Array<Object> = [];
    let postsObj: any = {};

    for (const source of sources) {
      const postsBySource = await telegram_scraper(source.account_name);
      //postsArr = [...postsArr, ...JSON.parse(postsBySource)]
      console.log('SOURCE->', source);
      postsObj[source.account_name] = JSON.parse(postsBySource)
    }
    //const posts = await telegram_scraper(channel_name);
    res.json({success: true, data: postsObj, message: 'Сообщения из источников успешно загружены'})
  }
});

router.get('/search_posts',)

module.exports = router;