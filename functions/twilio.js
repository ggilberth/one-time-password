const twilio = require("twilio");
const TOKENS = require("./tokens");

module.exports = new twilio.Twilio(TOKENS.accountSid, TOKENS.authToken)
