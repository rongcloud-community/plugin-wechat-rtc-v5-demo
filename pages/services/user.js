const {
  ObserverList
} = require('../../pages/common.js');
const utils = require('../../libs/undescore-1.8.3.js');

module.exports = (config) => {
  let getToken = (user) => {
    return new Promise((resolve) => {
      resolve({
        token: ''
      })
    })
  };

  return {
    getToken
  };
};