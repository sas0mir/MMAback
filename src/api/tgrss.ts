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
  const { channel_name } = req.query;
  console.log('LOAD-POSTS-API->', req.session, req.query);

  //const posts = await telegram_scraper(channel_name);
  res.json({success: true, data: [{test: '123'},{test: '456'}], message: 'Сообщения из источников успешно загружены'})
});

router.get('/search_posts',)

module.exports = router;