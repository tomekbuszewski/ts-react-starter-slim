require("dotenv").config();

const dev = require("./@config/webpack/dev");
const prod = require("./@config/webpack/prod");

const IS_PROD = process.env.NODE_ENV === "production";

module.exports = IS_PROD ? prod : dev;
