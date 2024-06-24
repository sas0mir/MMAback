const { handleMessage } = require("./lib/Telegram");

async function handler(req: any, method: any) {
    let { body } = req;
    console.log('HANDLER-BODY->', body);
    if (body) {
        let messageObj = body.message || body.channel_post;
        if(messageObj) {
            messageObj.chat_id = messageObj.chat.id;
            await handleMessage(messageObj)
        }
    }
}

module.exports = { handler }