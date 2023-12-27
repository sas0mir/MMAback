import TelegramBot from "node-telegram-bot-api";
import { get } from "lodash";

const api_key = process.env.API_KEY_BOT || '123'

// const examleResponse = {
//     message_id: ID_СООБЩЕНИЯ,
//     from: {
//       id: ID_ПОЛЬЗОВАТЕЛЯ,
//       is_bot: false,
//       first_name: ИМЯ_ПОЛЬЗОВАТЕЛЯ,
//       username: НИК_ПОЛЬЗОВАТЕЛЯ,
//       language_code: 'ru'
//     },
//     chat: {
//       id: ID_ЧАТА,
//       first_name: ИМЯ_ПОЛЬЗОВАТЕЛЯ,
//       username: НИК_ПОЛЬЗОВАТЕЛЯ,
//       type: 'private'
//     },
//     date: 1686255759,
//     text: ТЕКСТ_СООБЩЕНИЯ,
//   }

const bot = new TelegramBot(api_key, {

    polling: {
        interval: 300,
        autoStart: true
    }
    
});

bot.on("polling_error", err => console.log(get(err, 'data.error.message')));

bot.on('text', async msg => {

    console.log(msg);
    
    const msgWait = await bot.sendMessage(msg.chat.id, `Бот генерирует ответ...`);

    setTimeout(async () => {

        await bot.deleteMessage(msgWait.chat.id, msgWait.message_id);
        await bot.sendMessage(msg.chat.id, msg.text || "empty message");

    }, 5000);

});