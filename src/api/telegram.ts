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

router.post("/telegram-search", async (req: Request, res: Response) => {
  const { query, limit = 10 } = req.body;
  try {
    const searchResult = await mtproto.mtproto.call('contacts.search',
    { q: query, limit})
    if(searchResult) {
      res.json({success: true, data: searchResult, message: `Поиск ${query} успешен`})
    } else throw new Error(`Каналов или контактов по ${query} не найдено`)
  } catch(err) {
    res.json({success: false, data: err, message: 'TELEGRAM-CONTACTS-SEARCH-ERROR->' + err})
  }
});

router.post("/telegram-search-global", async (req: Request, res: Response) => {
  
})

module.exports = router;