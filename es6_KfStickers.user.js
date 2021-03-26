// ==UserScript==
// @name        绯月表情增强插件*改
// @namespace   https://github.com/HazukiKaguya/KFOL_Stickers
// @version     0.0.8
// @author      HazukiKaguya
// @description KF论坛专用的回复表情，插图扩展插件，在发帖时快速输入自定义表情和论坛BBCODE
// @icon        https://sticker.inari.site/favicon.ico
// @homepage    https://mistakey.top/KFStickers
// @include     http*://*2dkf.com/*
// @include     http*://*9moe.com/*
// @include     https://*kforz.com/*
// @include     https://*kfmax.com/*
// @include     http*://*kfgal.com/*
// @include     https://*miaola.info/*
// @copyright   2020-2021, Hazukikaguya
// @grant       none
// @license     MIT
// @run-at      document-end
// @updateURL   https://github.com/HazukiKaguya/KFOL_Stickers/raw/master/es6_KfStickers.user.js
// ==/UserScript==
//eddie32大佬的KFOL助手的表情插件的分支，目前基于5.1.3版本的喵拉分支 @copyright   2014-2019, eddie32 https://greasyfork.org/users/5415 https://github.com/liu599/KF-Emotion-UserScript
/*
本次更新日志：
0.0.8 部分代码更新优化为ES6语法(var->let)，增加实验性添加自定义贴纸功能（非es6），这是一个临时的添加自定义方案（经过精简的eddie32佬的5.2.1代码）。
历史更新日志：
0.0.7 修复伪中国语表情包的部分问题，更换图源，增加了一些快捷BBcode
0.0.6 BugFix. 表情贴纸旧域名替换为新域名的功能现在仅对<img>进行操作，避免因为修改innerHTML造成事件绑定失效,导致导致无法买贴等问题。
0.0.5 更改表情贴纸域名，增加表情贴纸旧域名替换为新域名的功能 
0.0.4 url添加kfmax，优化注释；
0.0.3 贴纸更新贴吧，微博等；
0.0.2 贴纸更新eddie32佬的伪中国语和流行（直接使用eddie32源）；
0.0.1 替换失效贴纸，常用替换为小日向雪花，bilibili替换为林大B
*/
'use strict';
// 版本号
const version = '0.0.8';
// 网站是否为KfMobile
const isKfMobile = typeof Info !== 'undefined' && typeof Info.imgPath !== 'undefined';
// 表情贴纸旧域名替换为新域名
let x = document.getElementsByTagName("img");
for (let i = 0; i < x.length; i++) {
   x[i].src=x[i].src.replace(/mistake.tech\/emote/g, "sticker.inari.site");
   //实验性功能，此储存桶地址的表情贴纸很可能和修复后的表情贴纸并不能一一对应。
   x[i].src=x[i].src.replace(/http:\/\/o6smnd6uw.bkt.clouddn.com\/xds3\/akari/g, "https://sticker.inari.site/akarin/akarin");
}
// 实验性功能，临时的添加自定义方案（经过精简的eddie32佬的5.2.1代码），如果不需要请注释掉下面这行。
!function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:i})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(i,o,function(t){return e[t]}.bind(null,o));return i},t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t){"use strict";function n(e){return-1!==["png","jpg","jpeg","bmp","gif","webp","psd","svg","tiff"].indexOf(e.toLowerCase())}Object.defineProperty(t,"__esModule",{value:!0}),t.readEmotions=t.addEmotions=t.loadEmotions=t.join=void 0,t.join=function(e){var t="";return Object.keys(e).forEach(function(n){t+=e[n]+" "}),t},t.addEmotions=function(e){e.forEach(function(e,t){var i=(new Date).getTime(),o=e.lastIndexOf(".");n(e.substr(o+1))&&window.localStorage.setItem("kfe_"+i+"_"+t,e)})},t.readEmotions=function(e){for(var t=[],n=0;n<window.localStorage.length;n+=1){var i,o=window.localStorage.key(n);o.includes(e)&&((i=document.createElement("img")).src=window.localStorage[o],i.dataset.link="",i.className="kfe-smile",t.push(i))}return t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(2),o=n(0),t=document.getElementsByTagName("textarea").item(0),n=[{groupEmotions:[],groupTitle:"自定义",groupType:i.GroupType.User}],o={mainView:'#kfe-container {font: 12px/28px "Hiragino Sans GB","Microsoft YaHei","Arial","sans-serif"; margin-bottom: 5px; }',stageView:"#kfestage {height: 100px; padding: 3px 3px; overflow-x: auto; margin-top:4px;margin-bottom:4px; border:1px solid none; position:relative; z-index:200; display: none; } #kfestage span { cursor: pointer }",menuView:'#kfemenu {display:inline-block;cursor:pointer; text-align:center; padding: 0; font: 12px/30px "Hiragino Sans GB","Microsoft YaHei","Arial","sans-serif";background-color: none;border-color: none;color: #fff; } #kfemenu ul { list-style-type: none; margin: 0; padding: 0; } #kfemenu ul li { display: inline-block; text-align: middle } #kfemenu ul li a { display: block; color: #5511dd; min-width: 55px; } #kfemenu ul li a:hover, #kfemenu ul li a.active {background-color: none;border-color: #ff7680; color: deeppink;}',txtBtn:"a.txtBtnEmotion { display: inline-block; text-decoration: none; cursor: pointer; padding: 0 8px; font: 12px/24px 'Hiragino Sans GB','Microsoft YaHei','Arial','sans-serif';} a.txtBtnEmotion:hover { background: black; color: #fff; }",imageLink:" .kfe-smile { display: inline-block; max-width: 60px; max-height: 60px; cursor: pointer; }",popUp:"#kfeppp {position: fixed; bottom: 10px; right: 10px; z-index: 999; width: 400px; display: block; height: 300px; background: #f3f3f3; border: 1px solid #000; display: none}"},o=new i.EmotionPlugin("kfe",n,o,t);t.parentNode.insertBefore(o.appInstance,t)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.EmotionPlugin=t.CssStyles=t.EmotionMenu=t.EmotionMenuItem=t.GroupType=void 0;var i,o=n(0);!function(e){e[e.User=0]="User"}(i=t.GroupType||(t.GroupType={})),n=function(){function e(e,t,n,i){this.targetInstance=i,this.divPrefix=e,this.appInstance=document.createElement("div"),this.Popup=document.createElement("div"),this.Popup.id=this.divPrefix+"ppp",this.Popup.innerHTML='<div style="display: block; width: 100%; padding: 10px;"><h3>每个表情一行</h3><textarea id="kfepqp" style="overflow-x: auto; width: 90%;"></textarea><div><button id="'+this.divPrefix+'ppp1">确认</button><button id="'+this.divPrefix+'ppp2">取消</button></div>',this.appInstance["class"]=this.divPrefix+"-container",this.appInstance.appendChild(this.Popup),this.EmotionMenu=t,this.EmotionStyles=n,this.loadMenus(),this.loadMenuData(t),this.loadStage(),this.loadStyles(n),this.stageInstance.style.width=window.getComputedStyle(this.targetInstance,null).getPropertyValue("width")}return e.prototype.loadStyles=function(e){var t=document.createElement("style");t.innerHTML=o.join(e),this.appInstance.appendChild(t)},e.prototype.loadMenus=function(){var e=document.createElement("div");e.id=this.divPrefix+"menu",this.appInstance.appendChild(e),this.menuInstance=e},e.prototype.loadStage=function(){var e=this,t=document.createElement("div");t.id=this.divPrefix+"stage",t.addEventListener("click",function(t){return e.stageEmitter(t)}),this.appInstance.appendChild(t),this.stageInstance=t},e.prototype.stageEmitter=function(e){var t=e.target,n=this.targetInstance.scrollTop,i=this.targetInstance.value,o=this.targetInstance.selectionStart,a=i.substring(0,o),i=i.substring(this.targetInstance.selectionEnd,i.length);e.target instanceof HTMLSpanElement&&(e.target.id===this.divPrefix+"add"&&this.addUserDefinedEmotions(e),e.target.id===this.divPrefix+"delete"&&this.deleteUserDefinedEmotions()),e.target instanceof HTMLAnchorElement&&(this.targetInstance.value=a+decodeURI(t.dataset.sign)+i,o+=decodeURI(t.dataset.sign).length),e.target instanceof HTMLImageElement&&(""!==e.target.dataset.link?(this.targetInstance.value=a+(""+e.target.dataset.link)+i,o+=6):(this.targetInstance.value=a+("[img]"+e.target.src)+"[/img]"+i,o=o+e.target.src.length+11)),this.targetInstance.selectionStart=o,this.targetInstance.selectionEnd=o,this.targetInstance.focus(),this.targetInstance.scrollTop=n},e.prototype.loadMenuData=function(e){var t=this,n=document.createElement("ul");e.forEach(function(e){var i=document.createElement("li"),o=document.createElement("a");i.className=t.divPrefix+"00001",o.title=e.groupTitle,o.dataset.loadtype=""+e.groupType,o.addEventListener("click",function(n){return t.expandMenu(n,e,i.className)}),o.innerHTML='<span class="t">'+e.groupTitle+"</span>",i.appendChild(o),n.appendChild(i)}),this.menuInstance.appendChild(n)},e.prototype.expandMenu=function(e,t,n){var o=this;switch(this.clearStage(),this.toggleStage(e,n),t.groupType){case i.User:var a=document.createElement("span");a.innerHTML=" [增加表情] ",a.id=this.divPrefix+"add",a.addEventListener("click",function(e){return o.toggleInputWindow(e)}),this.stageInstance.appendChild(a),a=document.createElement("span"),a.innerHTML=" [(功能未开发)] ",a.id=this.divPrefix+"btn",this.stageInstance.appendChild(a),a=document.createElement("span"),a.innerHTML=" [清空表情] ",a.id=this.divPrefix+"clear",a.addEventListener("click",this.clearUserDefinedEmotions.bind(this)),this.stageInstance.appendChild(a),this.loadUserDefinedEmotions()}},e.prototype.clearStage=function(){this.stageInstance.innerHTML=""},e.prototype.toggleStage=function(e,t){t=document.querySelectorAll("."+t),e=e.target,(e=e instanceof HTMLSpanElement?e.parentElement:e).className&&e.className.includes("active")?e.className="":(t.forEach(function(e){e.querySelector("a").className=""}),e.className="active"),!e.className.includes("active")&&this.stageInstance.style.display&&"none"!==this.stageInstance.style.display?this.stageInstance.style.display="none":this.stageInstance.style.display="block"},e.prototype.toggleInputWindow=function(e){var t=this;e.stopPropagation(),e.preventDefault();var n=document.getElementById(this.divPrefix+"ppp1"),e=n.cloneNode(!0);e.addEventListener("click",function(e){return t.addUserDefinedEmotions(e)}),n.parentNode.replaceChild(e,n),e=document.getElementById(this.divPrefix+"ppp2"),n=e.cloneNode(!0),n.addEventListener("click",function(e){return t.toggleInputWindow(e)}),e.parentNode.replaceChild(n,e),this.closeWindow()},e.prototype.closeWindow=function(){var e=document.getElementById(this.divPrefix+"ppp");e.style.display&&"none"!==e.style.display?e.style.display="none":(e.style.display="block",this.loadUserDefinedEmotions())},e.prototype.addUserDefinedEmotions=function(e){e.preventDefault(),e.stopPropagation(),e=document.getElementById(this.divPrefix+"pqp"),o.addEmotions(e.value.split("\n")),e.value="",this.closeWindow()},e.prototype.deleteUserDefinedEmotions=function(){},e.prototype.loadUserDefinedEmotions=function(){var e=o.readEmotions(""+this.divPrefix),t=document.querySelector("#"+this.divPrefix+"outer");t?document.querySelector("#"+this.divPrefix+"outer").innerHTML="":(t=document.createElement("div")).id=this.divPrefix+"outer",e.forEach(function(e){t.appendChild(e)}),this.stageInstance.appendChild(t)},e.prototype.clearUserDefinedEmotions=function(){if(window.confirm("Clear ALL Emotion Caches?")){for(var e=0;e<window.localStorage.length;e+=1){var t=window.localStorage.key(e);t.includes(""+this.divPrefix)&&window.localStorage.removeItem(t)}this.loadUserDefinedEmotions()}},e}(),t.EmotionPlugin=n}]);


// 灰企鹅
const KfSmileList = [];
const KfSmileCodeList = [];
let kfImgPath = typeof imgpath !== 'undefined' ? imgpath : '';
if (isKfMobile) kfImgPath = Info.imgPath;
for (let i = 1; i < 49; i++) {
    KfSmileList.push(`/${kfImgPath}/post/smile/em/em${(i) > 9 ? i : ('0' + i)}.gif`);
    KfSmileCodeList.push(`[s:${i + 9}]`);
}

// 小日向雪花
const YukikaSmileList = [];
for (let i = 1; i < 7; i++) {
    YukikaSmileList.push(`https://sticker.inari.site/yukika/${i}.jpg`);
}
for (let i = 21; i < 24; i++) {
    YukikaSmileList.push(`https://sticker.inari.site/yukika/${i}.jpg`);
}

// AC娘表情
const AcSmileList = [];
for (let i = 1; i < 55; i++) {
    AcSmileList.push(`https://sticker.inari.site/acfun/1/${i}.png`);
}
for (let i = 1001; i < 1041; i++) {
    AcSmileList.push(`https://sticker.inari.site/acfun/2/${i}.png`);
}
for (let i = 2001; i < 2056; i++) {
    AcSmileList.push(`https://sticker.inari.site/acfun/3/${i}.png`);
}

// 百度贴吧
const BaiduSmileList = [];
for(let i = 1; i < 10; i++) {
    BaiduSmileList.push(`http://tb2.bdstatic.com/tb/editor/images/face/i_f0${i}.png`);
}
for(let i = 10; i < 56; i++) {
    BaiduSmileList.push(`http://tb2.bdstatic.com/tb/editor/images/face/i_f${i}.png`);
}
for(let i = 1; i < 10; i++) {
    BaiduSmileList.push(`http://tb2.bdstatic.com/tb/editor/images/ali/ali_00${i}.gif`);
}
for(let i = 10; i < 71; i++) {
    BaiduSmileList.push(`http://tb2.bdstatic.com/tb/editor/images/ali/ali_0${i}.gif`);
}

// 微博
const WeiboSmileList = [];
for (let i = 0; i < 101; i++) {
    WeiboSmileList.push(`https://sticker.inari.site/weibo/${i}.png`);
}

// 东方
const TouhouSmileList = [];
for (let i = 1; i < 46; i++) {
    TouhouSmileList.push(`https://sticker.inari.site/touhou/reimu/${i}.jpg`);
}


// 阿卡林 from 摇曳百合
const AkarinSmileList = [];
for (let i = 1; i < 21; i++) {
    AkarinSmileList.push(`https://sticker.inari.site/akarin/2/akarin (${i}).gif`);
}
for (let i = 1; i < 72; i++) {
    AkarinSmileList.push(`https://sticker.inari.site/akarin/1/akarin (${i}).png`);
}

// 林大B
const lindaBSmileList = [];
for (let i = 1; i < 52; i++) {
    lindaBSmileList.push(`https://sticker.inari.site/lindaB/lindaB (${i}).jpg`);
}

// lovelive表情
const LoveliveSmallSmileList = [];
for (let i = 1; i < 42; i++) {
    LoveliveSmallSmileList.push(`https://sticker.inari.site/lovelive/2/ll (${i}).png`);
}
for (let i = 0; i < 38; i++) {
    LoveliveSmallSmileList.push(`https://sticker.inari.site/lovelive/4/ll (${i}).jpg`);
}

// 少女歌剧
const RevstarSmileList = [];
for (let i = 1; i < 41; i++) {
    RevstarSmileList.push(`https://sticker.inari.site/revstar/revstar (${i}).png`);
}

// BanG Dream
const BandoriSmileList = [];
for (let i = 1; i < 41; i++) {
    BandoriSmileList.push(`https://sticker.inari.site/bangdream/bangdream (${i}).png`);
}

// 公主链接
const ReDiveSmileList = [];
for (let i = 1; i < 49; i++) {
    ReDiveSmileList.push(`https://sticker.inari.site/redive/sticker (${i}).png`);
}

// 伪中国语
const FakeCHSSmileList = [];
for (let i = 49; i < 83; i++) {
    FakeCHSSmileList.push(`https://sticker.inari.site/fakehan/sticker (${i}).png`);
}

// 流行
const PopularSmileList = [];
for (let i = 1; i < 48; i++) {
    PopularSmileList.push(`https://sticker.inari.site/pop/sticker (${i}).png`);
}


/**
 * 表情菜单
 */
const MenuList = {
    KfSmile: {datatype: 'imageLink', title: 'KF自带', addr: KfSmileList, ref: KfSmileCodeList},
    Shortcut: {
        datatype: 'plain',
        title: '快捷',
        addr: [
            '[sell=100][/sell]', '[quote][/quote]', '[hide=100][/hide]', '[code][/code]', '[strike][/strike]', '[fly][/fly]','[color=#00FF00][/color]', 
            '[b][/b]', '[u][/u]', '[i][/i]', '[hr]', '[backcolor=][/backcolor]', '[url=][/url]','[img][/img]','[table][/table]','[tr][/tr]','[td][/td]',
            '[align=left][/align]','[align=center][/align]','[align=right][/align]','[audio][/audio]','[video][/video]','[email][/email]','[list][/list]',
            '[/align]这里是签名档内容，可以随意修改，支持bbcode，实验性功能，喵拉手机版不显示，编辑帖子后如果有修改说明会导致喵拉手机版重复显示两次内容。',
        ],
        ref: [
            '出售贴sell=售价', '引用', '隐藏hide=神秘等级', '插入代码', '删除线', '跑马灯', '文字颜色', '粗体', '下划线','斜体', '水平线', '背景色', '插入链接', '插入图片',
            '插入表格','插入表格行','插入表格列','左对齐','居中','右对齐','插入音频','插入视频','Email','插入列表','签名档[实验性功能]'
        ]
    },
    Emoji: {
        datatype: 'plain',
        title: '颜文字',
        addr: [
            '(●・ 8 ・●)', '╰(๑◕ ▽ ◕๑)╯', '(ゝω・)', '〜♪♪', '(ﾟДﾟ≡ﾟДﾟ)', '(＾o＾)ﾉ', '(|||ﾟДﾟ)', '(`ε´ )', '(╬ﾟдﾟ)', '(|||ﾟдﾟ)', '(￣∇￣)',
            '(￣3￣)', '(￣ｰ￣)', '(￣ . ￣)', '(￣︿￣)', '(￣︶￣)', '(*´ω`*)', '(・ω・)', '(⌒▽⌒)', '(￣▽￣）', '(=・ω・=)', '(｀・ω・´)',
            '(〜￣△￣)〜', '(･∀･)', '(°∀°)ﾉ', '(￣3￣)', '╮(￣▽￣)╭', '( ´_ゝ｀)', 'のヮの', '(ﾉ؂< ๑）诶嘿☆～', '(<_<)', '(>_>)',
            '(;¬_¬)', '(▔□▔)/', '(ﾟДﾟ≡ﾟдﾟ)!?', 'Σ(ﾟдﾟ;)', 'Σ( ￣□￣||)', '(´；ω；`)', '（/TДT)/', '(^・ω・^ )', '(｡･ω･｡)', '(●￣(ｴ)￣●)',
            'ε=ε=(ノ≧∇≦)ノ', '(´･_･`)', '(-_-#)', '（￣へ￣）', '(￣ε(#￣) Σ', 'ヽ(`Д´)ﾉ', '(╯°口°)╯(┴—┴', '（#-_-)┯━┯', '_(:3」∠)_', '(笑)',
            '(汗)', '(泣)', '(苦笑)', '(´・ω・`)', '(╯°□°）╯︵ ┻━┻', '(╯‵□′)╯︵┻━┻', '( ´ρ`)', '( ﾟωﾟ)', '(oﾟωﾟo)', '(　^ω^)', '(｡◕∀◕｡)',
            '/( ◕‿‿◕ )\\', 'ε٩( º∀º )۶з', '(￣ε(#￣)☆╰╮(￣▽￣///)', '（●´3｀）~♪', '_(:з」∠)_', 'хорошо!', '＼(^o^)／', '(•̅灬•̅ )', '(ﾟДﾟ)',
            'まったく、小学生は最高だぜ！！', 'ε=ε=ε=┏(゜ロ゜;)┛', '(；°ほ°)', '⎝≧⏝⏝≦⎠', 'ヽ(✿ﾟ▽ﾟ)ノ', '焔に舞い上がるスパークよ、邪悪な異性交際に、天罰を与え！',
            '|•ω•`)'
        ]
    },
    Yukika:   {datatype: 'image', title: '小日向雪花', addr: YukikaSmileList},
    Acfun:    {datatype: 'image', title: 'ACFUN', addr: AcSmileList},
    Akari:    {datatype: 'image', title: 'Akari', addr: AkarinSmileList},
    lindaB:   {datatype: 'image', title: '林大B', addr: lindaBSmileList},
    LoveLive: {datatype: 'image', title: 'LoveLive', addr: LoveliveSmallSmileList},
    Revstar:  {datatype: 'image', title: '少女歌剧', addr: RevstarSmileList},
    Bandori:  {datatype: 'image', title: 'BangDream', addr: BandoriSmileList},
    ReDive:   {datatype: 'image', title: '公主链接', addr: ReDiveSmileList},
    Touhou:   {datatype: 'image', title: '东方', addr: TouhouSmileList},
    Baidu:    {datatype: 'image', title: '贴吧', addr: BaiduSmileList},
    Weibo:    {datatype: 'image', title: '微博', addr: WeiboSmileList},
    FakeCHS:  {datatype: 'image', title: '伪中国语', addr: FakeCHSSmileList},
    Popular:  {datatype: 'image', title: '流行', addr: PopularSmileList},
};

/**
 * 添加BBCode
 * @param textArea 文本框
 * @param {string} code BBCode
 * @param {string} selText 选择文本
 */
const addCode = function (textArea, code, selText = '') {
    let startPos = !selText ? (code.indexOf('[img]') > -1 || code.indexOf(']') < 0 ? code.length : code.indexOf(']') + 1) : code.indexOf(selText);
    if (typeof textArea.selectionStart !== 'undefined') {
        let prePos = textArea.selectionStart;
        textArea.value = textArea.value.substring(0, prePos) + code + textArea.value.substring(textArea.selectionEnd);
        textArea.selectionStart = prePos + startPos;
        textArea.selectionEnd = prePos + startPos + selText.length;
    }
    else {
        textArea.value += code;
    }
};

/**
 * 显示放大的表情图片
 * @param {jQuery} $img 表情图片对象
 */
const showZoomInImage = function ($img) {
    if ($img.get(0).naturalWidth <= $img.height()) return;
    let offset = $img.offset();
    let $zoomIn = $(`<img class="kfe-zoom-in" src="${$img.attr('src')}" alt="[预览图片]">`).appendTo('body');
    let windowWidth = $(window).width();
    let zoomInWidth = $zoomIn.outerWidth();
    let top = offset.top - $zoomIn.outerHeight() - 5;
    let left = offset.left + $img.width() / 2 - zoomInWidth / 2;
    if (left < 0) left = 0;
    else if (left + zoomInWidth > windowWidth) left = windowWidth - zoomInWidth;
    $zoomIn.css({top, left});
};

/**
 * 获取表情面板的HTML代码
 * @param {string} key 菜单关键字
 * @returns {string} 表情面板内容
 */
const getSmilePanelHtml = function (key) {
    let data = MenuList[key];
    if (!data) return '';
    let html = '';
    for (let i = 0; i < data.addr.length; i++) {
        if (data.datatype === 'image') {
            html += `<img class="kfe-smile" src="${data.addr[i]}" alt="[表情]">`;
        }
        else if (data.datatype === 'imageLink') {
            let ref = typeof data.ref !== 'undefined' && typeof data.ref[i] !== 'undefined' ? data.ref[i] : '';
            html += `<img class="kfe-smile" data-code="${ref}" src="${data.addr[i]}" alt="[表情]">`;
        }
        else if (data.datatype === 'plain') {
            let ref = typeof data.ref !== 'undefined' && typeof data.ref[i] !== 'undefined' ? data.ref[i] : data.addr[i];
            html += `<a class="kfe-smile-text" data-code="${data.addr[i]}" href="#">${ref}</a>`;
        }
    }
    return `<div class="kfe-smile-panel" data-key="${key}">${html}</div>`;
};

/**
 * 获取子菜单的HTML代码
 * @returns {string} 子菜单内容
 */
const getSubMenuHtml = function () {
    let html = '';
    $.each(MenuList, function (key, data) {
        html += `<a class="kfe-sub-menu" data-key="${key}" href="#" title="${data.title}">${data.title}</a>`;
    });
    return html;
};

/**
 * 创建容器
 * @param textArea 文本框
 */
const createContainer = function (textArea) {
    let $container = $(`
<div class="kfe-container">
  <div class="kfe-menu">
    <span title="本分支由mistakey维护，目前为eddie32佬插件的喵拉布丁分支的分支" style="cursor: pointer;"><b>:)</b></span>
    ${getSubMenuHtml()}
    <span class="kfe-close-panel">[-]</span>
  </div>
</div>
`).insertBefore($(textArea));
    $container.on('click', '.kfe-sub-menu', function (e) {
        e.preventDefault();
        let $this = $(this);
        let key = $this.data('key');
        if (!key) return;
        $container.find('.kfe-sub-menu').removeClass('kfe-sub-menu-active');
        $this.addClass('kfe-sub-menu-active');
        $container.find('.kfe-smile-panel').hide();
        let $panel = $container.find(`.kfe-smile-panel[data-key="${key}"]`);
        if ($panel.length > 0) $panel.show();
        else $(getSmilePanelHtml(key)).appendTo($container).show();
    }).on('click', '.kfe-smile, .kfe-smile-text', function (e) {
        e.preventDefault();
        let $this = $(this);
        let code = $this.data('code');
        if (!code) code = `[img]${$this.attr('src')}[/img]`;
        addCode(textArea, code);
        if (/(Mobile|MIDP)/i.test(navigator.userAgent)) textArea.blur();
        else textArea.focus();
    }).on('mouseenter', '.kfe-smile', function () {
        $('.kfe-zoom-in').remove();
        showZoomInImage($(this));
    }).on('mouseleave', '.kfe-smile', function () {
        $('.kfe-zoom-in').remove();
    }).find('.kfe-close-panel').click(function () {
        $container.find('.kfe-smile-panel').hide();
    });
};

/**
 * 添加CSS
 */
const appendCss = function () {
    $('head').append(`
<style>
  .kfe-container { padding: 5px; vertical-align: middle; font: 12px/1.7em "sans-serif"; }
  .kfe-menu { margin-bottom: 5px; }
  .kfe-sub-menu { margin: 0 7px; text-decoration: none; border-bottom: 2px solid transparent; }
  .kfe-sub-menu:hover, .kfe-sub-menu:focus { text-decoration: none; border-color: deeppink; }
  a.kfe-sub-menu-active { color: black }
  .kfe-smile-panel { display: none; height: 120px; padding: 5px 3px; overflow-y: auto; border-top: 1px solid #ddd; }
  .kfe-smile-panel[data-key="Shortcut"] { height: auto; }
  .kfe-smile { display: inline-block; max-width: 60px; max-height: 60px; cursor: pointer; }
  .kfe-smile-text { display: inline-block; padding: 3px 5px; }
  .kfe-smile-text:hover { color: #fff !important; background-color: #2b2b2b; text-decoration: none; }
  .kfe-close-panel { cursor: pointer; }
  .kfe-zoom-in {
    position: absolute; max-width: 150px; max-height: 150px; background-color: #fcfcfc; border: 3px solid rgba(242, 242, 242, 0.6);
    border-radius: 2px; box-shadow: 0 0 3px rgb(102, 102, 102);
  }
</style>
`);
    if (isKfMobile) {
        $('head').append(`
<style>
  #readPage .kfe-container, #writeMessagePage .kfe-container { margin-top: -10px; }
  .kfe-menu { white-space: nowrap; overflow-x: auto; }
</style>
`);
    }
};

/**
 * 初始化
 */
const init = function () {
    let $textAreas = $('textarea');
    if (!$textAreas.length) return;
    appendCss();
    $textAreas.each(function () {
        createContainer(this);
    });
};

init();
