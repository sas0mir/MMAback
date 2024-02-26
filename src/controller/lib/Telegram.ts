const { axiosInstance } = require("./axios");

function sendMessage(messageObj: any, messageText: String) {
    console.log('SEND-MESSAGE->', !!messageObj, messageText);
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
    if(messageText.charAt(0) === '/') {
        const command = messageText.substr(1);
        switch (command) {
            case "start":
                return sendMessage(messageObj, "OK LETS START!")

            default: return sendMessage(messageObj, 'COMMAND UNKNOWN')
        }
    } else {
        return sendMessage(messageObj, messageText)
    }
}

module.exports = { handleMessage }