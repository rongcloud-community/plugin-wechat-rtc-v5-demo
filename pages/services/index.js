const RongIMLib = require('@rongcloud/imlib-next');

const Connection = require('./connection.js');
const User = require('./user.js');
const RTC = require('./rtc.js');

module.exports = (config) => {
  return {
    User: User(),
    Connection: Connection(config),
    RTC: RTC(config)
  };
};