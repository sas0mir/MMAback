import express, {NextFunction, Request, response, Response} from "express";
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

router.post("/subscribe", middlewares.requireAuth, async (req: Request, res: Response) => {
  const {user_id, author, source, platform} = req.body;
  console.log('API-SUBSCRIBE->', user_id, author, source, platform);
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

module.exports = router;