const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const paymentApi = require("./payment");
const ddataApi = require("./ddata");
const tgRssApi = require("./tgrss");
const themesApi = require("./themes");

const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(paymentApi);
router.use(ddataApi);
router.use(tgRssApi);
router.use(themesApi);

module.exports = router;