import express, {NextFunction, Request, response, Response} from "express";
const Users = require("../models/users");
const Themes = require("../models/themes");
const Sources = require("../models/sources");
const Authors = require("../models/authors");
const Journal = require("../models/journal");
const middlewares = require("../middlewares");
const {DataTypes} = require("sequelize");
const mtproto = require('../modules/telegram/tg');
import {get} from 'lodash'

const router = express.Router();

interface SessionRequest extends Request {
  session: any
}

router.post("/subscribe", middlewares.requireAuth, async (req: Request, res: Response) => {
  const {user_id, author, source, platform} = req.body;
  let sourceExist = await Sources.findOne({
    where: {name: source.title}
  }).catch((err: any) => {
    console.log('SOURCE-EXIST-ERR->', err);
    return res.status(400).json({success: false, message: `Ошибка при проверке наличия источника в базе: ${err}`})
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
  if(!platform) {
    return res.status(400).json({success: false, message: "Поле платформа не передано для сохранения"})
  }
  if(!sourceExist) {
    //+расчет рейтинга сюда
    if(platform === '1') {
      sourceExist = await Sources.create({
          id: DataTypes.DEFAULT,
          name: source.title,
          context: source,
          rating: 0,
          platform: platform,
          account_name: source.username,
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

      try {
        if (mtproto.mtproto && !!mtproto.mtproto?.call) {
          sourceExist.subscribed = await mtproto.mtproto.call('channels.joinChannel',
            { channel: source.username}
          )

          sourceExist.fullChannelInfo = await mtproto.mtproto.call('channels.getFullChannel',
            { channel: source.username}
          )
        }
      } catch (err) {
        console.log('TG-CHANNEL-SUBSCRIBE-ERROR->', err);
      }

      let newUserSources = userData.sources || [];
      newUserSources.push(sourceExist.id)
      await userData.changed('sources', true);
      await userData.update({sources: newUserSources});
      await userData.save();

      //журналирование
      await Journal.create({
        id: DataTypes.DEFAULT,
        user: user_id,
        data: {"message": `Вы подписались на источник ${source.name}`},
        createdAt: new Date()
      })
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
        views: 1,
        history: [{rating: 1, views: 1, date: new Date(), changes: ''}],
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