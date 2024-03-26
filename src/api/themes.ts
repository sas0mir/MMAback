import express, {NextFunction, Request, response, Response} from "express";
const Users = require("../models/users");
const Themes = require("../models/themes");
const Sources = require("../models/sources");
const Authors = require("../models/authors");
const middlewares = require("../middlewares");
const TChannels = require("tchannels");
import { telegram_scraper } from "telegram-scraper";
import {get} from 'lodash'

const router = express.Router();

interface SessionRequest extends Request {
  session: any
}

router.post("/subscribe", middlewares.requireAuth, async (req: Request, res: Response) => {
  const {user_id, author, source, platform} = req.body;
  let sourceExist = await Sources.findOne({
    where: {name: source}
  }).catch((err: any) => {
    console.log('SOURCE-EXIST-ERR->', err);
    return res.status(400).json({success: false, message: err})
  })
  // let authorExist = await Authors.findOne({
  //   where: {name: author}
  // }).catch((err: any) => {
  //   console.log('AUTHOR-EXIST-ERR->', err);
  //   return res.status(400).json({success: false, message: err})
  // })
  if(sourceExist) {
    return res.status(400).json({success: false, message: "Источник уже в базе данных"})
  }
  if(!sourceExist) {
    if(platform === '1') {
      const check_channel = await telegram_scraper(source);
      const check_ch_res = check_channel === 'Unknown telegram channel' ? check_channel : JSON.parse(check_channel);
      if(check_ch_res === 'Unknown telegram channel') {
        return res.status(400).json({success: false, message: "Телеграм канал с таким юзернеймом не существует"})
      } else {
        const channel_name = check_ch_res[0].user_name;
        sourceExist = await Sources.create({
            name: channel_name,
            context: null,
            rating: 0,
            platform: platform,
            account_name: source,
            createdAt: new Date()
        }).catch((err: any) => {
            console.log('SOURCE-CREATE-ERR->', err);
            return res.status(400).json({success: false, message: err})
        })
      }
    }
  }
  res.json({success: true, data: sourceExist, message: 'Источник успешно добавлен'})
});

router.post("/theme_create", middlewares.requireAuth, async (req: Request, res: Response) => {
  //source переделать в селект на фронте и выбирать из предложенных каналов, сюда отправлять source.id
    const { user_id, user_themes, name, prompt, platform, source, author } = req.body;

    console.log('THEME-API-1->', user_id, user_themes, name, source, author)

  let themeExist = await Themes.findOne({
    where: { name: name }
  }).catch(
    (err: any) => {
      console.log("THEME-EXIST-ERR->", err);
    }
  );

//   let sourceExist = await Sources.findOne({
//     where: { name: source }
//   }).catch((err: any) => {
//     console.log('SOURCE-EXIST-ERR->', err);
//   });

//   let authorExist = await Authors.findOne({
//     where: { name: author }
//   }).catch((err: any) => {
//     console.log('AUTHOR-EXIST-ERR->', err);
//   })

  const userData = await Users.findOne({
    where: { id: user_id }
  }).catch(
    (err: any) => {
      console.log("Error: ", err);
    }
  );

  //пока просто создается тема и добавляется юзеру
  console.log('THEME-API-2->', themeExist, userData);

  if(!themeExist) {
    themeExist = await Themes.create({
        name: name,
        prompt: prompt,
        source: 1,//source из запроса
        clients: [user_id],
        type: 1,
        rating: null,
        createdAt: new Date()
    }).catch((err: any) => {
        console.log('THEME-CREATE-ERR->', err);
        return res.status(400).json({success: false, message: err})
    })
  }

  await userData.update({themes: user_themes});
  await userData.save();

    res.json({success: true, data: themeExist, user: userData, message: themeExist ? 'Тема добавлена пользователю' : 'Создана новая тема'})
});

router.get('/load_posts', middlewares.requireAuth, async (req: Request, res: Response) => {
  const { channel_name } = req.query;
  const posts = await telegram_scraper(channel_name);
  res.json({success: true, data: posts})
});

router.get('/search_posts',)

module.exports = router;