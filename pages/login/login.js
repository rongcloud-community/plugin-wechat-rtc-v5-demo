const utils = require('../../utils/util');
const common = require('../common');
const Services = require('../services/index.js');
const app = getApp();

const config = require('../../config');
const RongCloudRTC = require('@rongcloud/plugin-wechat-rtc')

// const conversationTypes = [
//   { appkey: config.appkey, secret: config.secret }
// ];

const conversationTypes = config

Page({
  data: {
    userId: '',
    index: 0,
    selected: conversationTypes[0],
    conversationTypeLabels: conversationTypes.map(item => item.appkey),
    mediaTypeLabels: [0, 1, 2],
    roomId: 'mini1114',
    isHiddenTip: true,
    isHiddenRoomTip: true,
    tag: 'RongCloudRTC',
    mediaType: 2
  },
  bindPickerChange: function (e) {
    let index = e.detail.value;
    this.setData({
      index,
      selected: conversationTypes[index]
    })
  },
  onInput: function (e) {
    let reg = /^[a-zA-Z0-9_]{1,15}$/;
    let { detail: { value: userId } } = e;
    let isHiddenTip = reg.test(userId) || utils.isEmpty(userId)
    this.setData({
      userId,
      isHiddenTip
    });
  },
  onRoomInput: function (e) {
    let reg = /^[a-zA-Z0-9_]{1,15}$/;
    let { detail: { value: roomId } } = e;
    let isHiddenRoomTip = reg.test(roomId) || utils.isEmpty(roomId)
    this.setData({
      roomId,
      isHiddenRoomTip
    });
  },
  login: function () {
    let context = this;
    let { data: { isHiddenRoomTip, isHiddenTip, userId, roomId, tag, mediaType, selected } } = context;
    if (!isHiddenRoomTip || !isHiddenTip){
     return; 
    }
    // let $services = Services({
    //   APPKEY: config.appkey,
    //   MS_URL: config.mediaServer,
    //   customCMP: config.customCMP,
    //   navigators: config.navigators
    // });
    let $services = Services({
      APPKEY: selected.appkey,
      MS_URL: selected.mediaServer,
      customCMP: selected.customCMP,
      navigators: selected.navigators,
      mediaServer: selected.mediaServer
    });
    app.globalData.$services = $services;

    let isEmpty = utils.isEmpty(userId);
    if (isEmpty) {
      context.setData({
        isHiddenTip: !isEmpty
      });
      return
    }
    wx.showLoading({
      title: '登录中...'
    });
    wx.request({
      url: selected.demoApi,
      method: 'POST',
      data: {
        userId: userId,
        appkey: selected.appkey,
        secret: selected.secret,
        name: `${userId}_name`,
        portrait: `${userId}_portrait`
      },
      success: function (result) {
        const { token } = result.data;
        wx.hideLoading();
        wx.navigateTo({
          url: `../main/main?roomId=${roomId}&token=${encodeURIComponent(token)}&userId=${userId}&tag=${tag}&mediaType=${mediaType}`,
        })
      },
      fail: function (error) {
        wx.hideLoading();
        common.showToast(`获取 Token 失败 ${error.statusCode}`)
      }
    })
  }
})