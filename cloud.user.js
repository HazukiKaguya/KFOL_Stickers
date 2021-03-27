// ==UserScript==
// @name        绯月表情增强插件*改*Dev云端版
// @namespace   https://github.com/HazukiKaguya/KFOL_Stickers/blob/master/cloud.user.js
// @version     9.0.1
// @author      HazukiKaguya
// @description KF论坛专用的回复表情, 插图扩展插件, 在发帖时快速输入自定义表情和论坛BBCODE
// @icon        https://sticker.inari.site/favicon.ico
// @homepage    https://mistakey.top/KFStickers
// @include     https://*miaola.info/*
// @include     https://*ikfol.com/*
// @include     https://*2dkf.com/*
// @include     https://*9moe.com/*
// @include     https://*kfgal.com/*
// @include     https://*kforz.com/*
// @include     https://*kfmax.com/*
// @copyright   2021 HazukiKaguya
// @require     https://sticker.inari.site/stickerDev.js
// @grant       none
// @license     MIT
// @run-at      document-end
// @updateURL   https://github.com/HazukiKaguya/KFOL_Stickers/raw/master/cloud.user.js
// ==/UserScript==
// 原作者eddie32, 本分支由HazukiKaguya基于最新5.2.1版本魔改 @copyright   2014-2019, eddie32 https://greasyfork.org/users/5415 https://github.com/liu599/KF-Emotion-UserScript
/*
本次更新
9.0.1 云端调用js，本版本所有github上的更新将只有作用的url的更新 依然可以在github安装手动更新的完整代码版。
历史更新
0.0.3 完全修复其在喵拉移动版的kf原生表情显示（更换为相对路径），update some code to es6
0.0.2 修复imgpath，使其kf原生企鹅表情支持喵拉手机站
0.0.1 稳定版功能“表情贴纸旧域名替换为新域名”移植
*/
