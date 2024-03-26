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

router.post("/telegram_rss", middlewares.requireAuth, async (req: Request, res: Response) => {

    const { user_id, user_themes, source, author } = req.body;

    console.log('TG-API-1->', user_id, user_themes, source, author);

    for(const platform in user_themes) {

    }

    const tg_rss = telegram_scraper('')

    // for (const s of user_channels) {

    // }

    // let result = await telegram_rss(telegram_channel_username)

    res.json({success: true, data: {}, message:'rss test'})
});

module.exports = router;