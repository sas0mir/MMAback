//import TelegramBot from "node-telegram-bot-api";
import { get } from "lodash";

const apiUrl = `${process.env.TELEGRAM_API_URL}${process.env.TELEGRAM_BOT_KEY}/`;
const setWebhookUrl = apiUrl + 'setWebhook?url=https://c2a6-185-104-126-181.ngrok-free.app/api/telegram';

//инициализация связи с ботом
export const setWebhook = async () => {
    console.log('SET-WEBHOOK-TRY->');
    const tgResp = await fetch(setWebhookUrl, {
        method: 'GET'
    }).then(response => {
        console.log('SET-WEBHOOK-RESPONSE->', response);
    }).catch(err => {
        console.log('SET-WEBHOOK-ERROR->', err)
    })
}

module.exports = setWebhook

// export const bot = new TelegramBot(process.env.TELEGRAM_BOT_KEY || '', {

//     polling: {
//         interval: 300,
//         autoStart: true
//     }
    
// });

// bot.on("polling_error", err => console.log(get(err, 'data.error.message')));

// bot.on('text', async msg => {

//     console.log(msg);
    
//     const msgWait = await bot.sendMessage(msg.chat.id, `Бот генерирует ответ...`);

//     setTimeout(async () => {

//         await bot.deleteMessage(msgWait.chat.id, msgWait.message_id);
//         await bot.sendMessage(msg.chat.id, msg.text || "empty message");

//     }, 5000);

// });

// module.exports = bot