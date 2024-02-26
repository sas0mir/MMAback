const axios = require("axios");

const BASE_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_KEY}`;

function getAxiosInstance() {
    return {
        get(method: String, params: any) {
            return axios.get(`/${method}`, {
                baseURL: BASE_URL,
                params
            })
        },
        post(method: String, data: any) {
            return axios({
                method: "post",
                baseURL: BASE_URL,
                url: `/${method}`,
                data
            })
        }
    }
}

module.exports = {axiosInstance: getAxiosInstance()}