const { axiosInstance } = require("./axios");

function sendMessage(messageObj: any, messageText: String) {
    if(messageObj) {
        return axiosInstance.get("sendMessage", {
            chat_id: messageObj.chat_id,
            text: messageText
        })
    }
}

function handleMessage(messageObj: any) {
    const messageText = messageObj ? messageObj.text : '';
    console.log('HANDLE-MESSAGE->', messageText);
    if(messageText.charAt(0) === '/' && messageObj.from) {
        const command = messageText.substr(1);
        switch (command) {
            case "start":
                return sendMessage(messageObj, "OK LETS START!")

            default: return sendMessage(messageObj, 'COMMAND UNKNOWN')
        }
    } else {
        if(/^smi_bot/.test(messageText)) {
            return sendMessage(messageObj, `Smi_bot answer to your message: ${messageText}`)
        }
    }
}

module.exports = { handleMessage }