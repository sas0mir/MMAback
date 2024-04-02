import express, {NextFunction, Request, response, Response} from "express";
const Users = require("../models/users");
const Themes = require("../models/themes");
const Sources = require("../models/sources");
const Authors = require("../models/authors");
const middlewares = require("../middlewares");
const {DataTypes} = require("sequelize");
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
            id: DataTypes.DEFAULT,
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

        const userData = await Users.findOne({
          where: { id: user_id }
        }).catch(
          (err: any) => {
            console.log("Error: ", err);
          }
        );

        let newUserSources = userData.sources || [];
        newUserSources.push(sourceExist.id)
        await userData.changed('sources', true);
        await userData.update({sources: newUserSources});
        await userData.save();
      }
    }
  }
  res.json({success: true, data: sourceExist, message: 'Источник успешно добавлен'})
});

router.post("/theme_create", middlewares.requireAuth, async (req: Request, res: Response) => {
    const { user_id, user_themes, name, prompt } = req.body;

  let themeExist = await Themes.findOne({
    where: { name: name }
  }).catch(
    (err: any) => {
      console.log("THEME-EXIST-ERR->", err);
    }
  );

  const userData = await Users.findOne({
    where: { id: user_id }
  }).catch(
    (err: any) => {
      console.log("Error: ", err);
    }
  );

  if(!themeExist) {
    themeExist = await Themes.create({
        id: DataTypes.DEFAULT,
        name: name,
        prompt: prompt,
        sources: userData.sources,
        clients: [user_id],
        rating: 1,
        createdAt: new Date()
    }).catch((err: any) => {
        console.log('THEME-CREATE-ERR->', err);
        return res.status(400).json({success: false, message: err})
    })
  }
  let newUserThemes = userData.themes || [];
  newUserThemes.push(themeExist.id)

  await userData.changed('themes', true);
  await userData.update({themes: newUserThemes});
  await userData.save();

    res.json({success: true, data: themeExist, user: userData, message: themeExist ? 'Тема добавлена пользователю' : 'Создана новая тема'})
});

module.exports = router;