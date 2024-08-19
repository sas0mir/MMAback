import express, {Request, Response} from "express";
//const Themes = require("../models/themes");
const middlewares = require("../middlewares");
import {get} from 'lodash';
const {handler} = require("../controller/index");
const mtproto = require('../modules/telegram/tg');
//const analyze_theme = require('../helpers/algoritm');
import { analyze_theme } from "../helpers/algoritm";

const router = express.Router();

interface SessionRequest extends Request {
  session: any
}

router.post("/telegram-contacts-search", async (req: Request, res: Response) => {
  const { query, limit = 10 } = req.body;
  //search: from_id (what user_id wrote - author)
  let apiResponse = {
    contacts: Object,
    //messagesFound: Object,
    //messagesGlobalFound: Object
  }
  try {
    apiResponse.contacts = await mtproto.mtproto.call('contacts.search',
    { q: query, limit})
    // apiResponse.messagesFound = await mtproto.mtproto.call('messages.search', {
    //   q: query, limit
    // })
    // apiResponse.messagesGlobalFound = await mtproto.mtproto.call ('messages.searchGlobal', {
    //   q: query, limit
    // })
    res.json({success: true, data: apiResponse, message: `Поиск ${query} успешен`})
  } catch(err) {
    res.json({success: false, data: err, message: 'TELEGRAM-SEARCH-ERROR->' + err})
  }
});

router.post("/telegram-search-global", async (req: Request, res: Response) => {
  const { query, limit = 10 } = req.body;
  try {
    const searchResult = await analyze_theme(query)
    console.log('TEST-0->', !!searchResult, searchResult);
    if (searchResult) res.json({success: true, data: searchResult, message: `Поиск ${query} успешен`})
  } catch(err) {
    console.log('TEST-ERR->', err);
    res.json({success: false, data: err, message: 'TELEGRAM-SEARCH-ERROR->' + err})
  }
})

//router.get("/telegram-")
module.exports = router;