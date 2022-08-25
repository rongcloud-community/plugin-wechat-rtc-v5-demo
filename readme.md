## demo 运行条件
1. 请先在 config 文件配置您在开发者后台创建的应用 `appkey`、`secret`
2. 使用小程序录制音视频前，必须授于摄像头和麦克风权限。详见微信小程序用户信息授权文档：
https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html


## 参数说明

### Appkey、secret 获取

[可在融云开发者后台 - 服务管理](https://developer.rongcloud.cn/app/appService/8zkf1JD8NLF0gxOV3S0NuA)中创建一个应用，创建完应用后，在下图中获取应用的 `appkey` 和 `secret`。
![](https://github.com/rongcloud-community/plugin-wechat-rtc-v5-demo/blob/main/base64.png)

<img width="362" alt="image" src="https://user-images.githubusercontent.com/13001095/186633019-8c1699f1-9952-4ba4-9ad5-f772d6e72d97.png">

### RoomId

房间号长度不能超过 64，可包含 `A-Z`、`a-z`、`0-9`、`+`、`=`、`-`、`_`
