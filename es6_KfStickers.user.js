// ==UserScript==
// @name        表情贴纸增强插件
// @namespace   https://github.com/HazukiKaguya/Stickers_PlusPlus
// @version     1.4.0
// @author      eddie32&喵拉布丁&HazukiKaguya
// @description 回复表情，插图扩展插件，在发帖时快速输入自定义表情和论坛BBCODE
// @icon        https://sticker.inari.site/favicon.ico
// @homepage    https://mistakey.top/StickersPP
// @include     https://*9shenmi.com*
// @include     https://*kf*
// @include     https://*miaola*
// @include     https://*365gal*
// @include     https://*-plus.net*
// @include     *bbs*
// @copyright   2014-2019, eddie32 ; 2020-2022, Hazukikaguya
// @grant       none
// @license     MIT
// @run-at      document-end
// @require     https://sticker.inari.site/js/jquery.min.user.js
// @updateURL   https://github.com/HazukiKaguya/Stickers_PlusPlus/raw/master/Stickerspp.user.js
// ==/UserScript==
// 本次更新日志：1.4.0 增加在线表情商店，重写个性化设置逻辑，修复bugs
// 历史更新记录：https://github.com/HazukiKaguya/Stickers_PlusPlus/blob/master/changelog.txt
'use strict';


/**
 * 各种设置
 */

// 版本号
const version = '1.4.0';
// 网站是否为KfMobile
const isKfMobile = typeof Info !== 'undefined' && typeof Info.imgPath !== 'undefined';
// jQuery隔离
this.$ = this.jQuery = jQuery.noConflict(true);
// 个性化设置
!localStorage.StickerConf?customize={"kanbanimg":"https://sticker.inari.site/truenight.gif","kanbansize":"64","onlineraw":"https://api.inari.site/?s=App.Sticker.","notauthed":false,"UseOldNum":false,"lcimglists":false,"olimglists":[]}:customize=JSON.parse(localStorage.StickerConf);
// 本地数据源
let LocalRaws=[
    {"id":1,"desc":"AC娘表情贴纸，属于AcSmileList，AC娘。","cover":"https://sticker.inari.site/acfun/1/1.png","name":"_Acfun","title":'AC娘',"addr":"_AcSmileList","numstart":[1,1001,2001],"numend":[55,1041,2056],"url1":["https://sticker.inari.site/acfun/1/","https://sticker.inari.site/acfun/2/","https://sticker.inari.site/acfun/3/"],"url2":[".png",".png",".png"]},
    {"id":2,"desc":"华语第三动漫高手论坛S1的麻将脸表情包喵~","cover":"https://sticker.inari.site/s1/1.gif","name":"_S1","title":'S1',"addr":"_S1SmileList","numstart":[1,1],"numend":[21,229],"url1":["https://sticker.inari.site/s1/","https://sticker.inari.site/s1/"],"url2":[".gif",".png"]},
    {"id":3,"desc":"《摇曳百合》的阿卡林的表情包~","cover":"https://sticker.inari.site/akarin/2/akarin (1).gif","name":"_Akarin","title":'阿卡林',"addr":"_AkarinSmileList","numstart":[1,1],"numend":[21,72],"url1":["https://sticker.inari.site/akarin/2/akarin (","https://sticker.inari.site/akarin/1/akarin ("],"url2":[").gif",").png"]},
    {"id":4,"desc":"小B是画师林大B练习用的看板娘，最初是在sosg论坛上出现~","cover":"https://sticker.inari.site/lindaB/lindaB (1).jpg","name":"_xiaoB","title":'小B',"addr":"_xiaoBSmileList","numstart":[1],"numend":[52],"url1":["https://sticker.inari.site/lindaB/lindaB ("],"url2":[").jpg"]},
    {"id":5, "desc":"微博贴吧表情包","cover":"https://sticker.inari.site/weibo/1.png","name":"_Weitb","title":'微博贴吧',"addr":"_WeitbSmileList","numstart":[1,1,10],"numend":[101,10,34],"url1":["https://sticker.inari.site/weibo/","https://tb2.bdstatic.com/tb/editor/images/face/i_f0","https://tb2.bdstatic.com/tb/editor/images/face/i_f"],"url2":[".png",".png",".png"]},
    {"id":6,"desc":"暹罗猫小红豆，世界，就是绕着猫打转！","cover":"https://sticker.inari.site/usr/Kawaii_Siamese/line/0_show.png","name":"_Siamese","title":'小红豆',"addr":"_SiameseSmileList","numstart":[1,1,1],"numend":[25,25,41],"url1":["https://sticker.inari.site/usr/Kawaii_Siamese/wx1/","https://sticker.inari.site/usr/Kawaii_Siamese/wx2/","https://sticker.inari.site/usr/Kawaii_Siamese/line/"],"url2":[".png"]},
	{"id":7,"desc":"Lovelive表情贴纸~","cover":"https://sticker.inari.site/lovelive/2/ll (1).png","name":"_LL","title":'LL',"addr":"_LLSmileList","numstart":[1,1],"numend":[42,20],"url1":["https://sticker.inari.site/lovelive/2/ll (","https://sticker.inari.site/lovelive/4/ll ("],"url2":[").png",").jpg"]},
	{"id":8,"desc":"少女☆歌剧。去吧，两人一起，摘下那颗星。","cover":"https://sticker.inari.site/revstar/revstar (1).png","name":"_Revue","title":'少歌',"addr":"_RevueSmileList","numstart":[1],"numend":[41],"url1":["https://sticker.inari.site/revstar/revstar ("],"url2":[").png"]},
	{"id":9,"desc":"公主连结Re:Dive。いま、新たな冒険の幕が上がる——","cover":"https://sticker.inari.site/redive/sticker (1).png","name":"_Redive","title":'PCR',"addr":"_RediveSmileList","numstart":[1],"numend":[49],"url1":["https://sticker.inari.site/redive/sticker ("],"url2":[").png"]},
	{"id":10,"desc":"BanG Dream！噜~ キラキラ☆ドキドキ~ ふえぇ~","cover":"https://sticker.inari.site/bangdream/bangdream (1).png","name":"_Bandori","title":'邦邦',"addr":"_BandoriSmileList","numstart":[1],"numend":[41],"url1":["https://sticker.inari.site/bangdream/bangdream ("],"url2":[").png"]},
];!localStorage.onlineraws?OnlineRaws=[]:OnlineRaws=JSON.parse(localStorage.onlineraws);
// 实验性功能，此储存桶地址的表情贴纸很可能和修复后的表情贴纸并不能一一对应。
let x = document.getElementsByTagName("img");let afdDate = new Date();
for (let i = 0; i < x.length; i++) {
 x[i].src=x[i].src.replace(/mistake.tech\/emote/g, "sticker.inari.site");
 x[i].src=x[i].src.replace(/http:\/\/o6smnd6uw.bkt.clouddn.com\/xds3\/akari/g, "https://sticker.inari.site/akarin/akarin");
 x[i].src=x[i].src.replace(/http:\/\/o6smnd6uw.bkt.clouddn.com\/xds\/2233/g, "https://sticker.inari.site/bili/2233");
 x[i].src=x[i].src.replace(/http:\/\/o6smnd6uw.bkt.clouddn.com\/lovelive\/Lovelive2nd/g, "https://sticker.inari.site/lovelive/Lovelive2nd");
 x[i].src=x[i].src.replace(/http:\/\/smilell2.eclosionstudio.com\/Small\/Lovelive2nd/g, "https://sticker.inari.site/lovelive/Lovelive2nd");
 x[i].src=x[i].src.replace(/bbs.kforz.com/g, "kf.miaola.work");}
// 在论坛资源区，直接显示表情贴纸增强插件所属域名的图片，而不是显示【请手动点击打开本图片】
document.body.querySelectorAll('.readtext a').forEach(i=>{
if(i.innerHTML==='<span class=\"k_f18\">请手动点击打开本图片</span>'){
let p=document.createElement("img");p.src=i.href;
if(p.src.match(/https:\/\/sticker.inari.site/)){i.parentElement.replaceChild(p,i);}
else if(p.src.match(/http:\/\/tb2.bdstatic.com\/tb\/editor\/images\/face/)){i.parentElement.replaceChild(p,i);}}})
// 文本区域粘贴图片预览区
function imgurl() {
 let imgpreview = document.createElement("div");if(isKfMobile==true){
     imgpreview.innerHTML = `<div id = "imgpreview" style = "position:fixed;left:5px;top:100px;z-index:88;cursor:pointer;" >
     <img class="imgpreview" src = "https://sticker.inari.site/favicon.ico" width =${customize.kanbansize+"%"} height =${customize.kanbansize+"%"}></div>`;
}else{if(localStorage.imgpvpc!=null){let imgpvpc=localStorage.imgpvpc;let imgpvpcpush = JSON.parse(imgpvpc);
     imgpreview.innerHTML = `<div id = "imgpreview" style = "position:fixed;left:${imgpvpcpush[0]};top:${imgpvpcpush[1]};z-index:88;cursor:pointer;" >
     <img class="imgpreview" src = ${customize.kanbanimg} width =${customize.kanbansize+"%"} height =${customize.kanbansize+"%"}></div>`;}
else{imgpreview.innerHTML = `<div id = "imgpreview" style = "position:fixed;left:5px;top:40px;z-index:88;cursor:pointer;" >
     <img class="imgpreview" src = ${customize.kanbanimg} width =${customize.kanbansize+"%"} height =${customize.kanbansize+"%"}></div>`;
}}document.body.appendChild(imgpreview);}imgurl();
// 可拖拽看板娘,会记录拖拽位置
let imgpv = document.getElementById("imgpreview");window.onload = function(){ drag(imgpv);};
function drag(obj){obj.onmousedown = function(event){obj.setCapture && obj.setCapture();event = event ||window.event
let cleft=obj.style.left,ctop=obj.style.top,ol = event.clientX - obj.offsetLeft,ot = event.clientY - obj.offsetTop;
document.onmousemove = function(event){event = event ||window.event;let left = event.clientX-ol,top = event.clientY-ot;
obj.style.left = left+"px";obj.style.top = top+"px";};
document.onmouseup = function(){document.onmousemove = null;document.onmouseup = null;
obj.releaseCapture && obj.releaseCapture();let vleft=obj.style.left,vtop=obj.style.top;
if(cleft==vleft&&vtop==ctop){$('.kfe-user-p').click();}
else{localStorage.setItem('imgpvpc',JSON.stringify([vleft,vtop]));};};return false;};};
// 数组去重
function qc(arr){let s1 = new Set(arr);return Array.from(s1);}



/**
 * 初始化表情图片
 */

// 灰企鹅
const KfSmileList = [];const KfSmileCodeList = [];
let check = ["kf", "365gal","miaola","bakabbs","9shenmi"],foundcheck = false;
for (let i = 0; i < check.length; i++) {if (window.location.href.indexOf(check[i]) > -1) {foundcheck = true;break;}}
if(foundcheck){let kfImgPath = typeof imgpath !== 'undefined' ? imgpath : '';
if (isKfMobile) kfImgPath = Info.imgPath;for (let i = 1; i < 49; i++){
KfSmileList.push(`/${kfImgPath}/post/smile/em/em${(i) > 9 ? i : ('0' + i)}.gif`);KfSmileCodeList.push(`[s:${i + 9}]`);}}
else{for (let i = 1; i < 49; i++) { KfSmileList.push(`https://sticker.inari.site/pesoguin/em${i}.gif`);
KfSmileCodeList.push(`[img]https://sticker.inari.site/pesoguin/em${i}.gif[/img]`);}}
for (let i = 1; i < 204; i++) { KfSmileList.push(`https://sticker.inari.site/pesoguin/${i}.gif`);
KfSmileCodeList.push(`[img]https://sticker.inari.site/pesoguin/${i}.gif[/img]`);}

// 随机
const RandomSmileList = []; RandomSmileList.push(`https://sticker.inari.site/yukika/${Math.ceil(Math.random()*6)}.jpg`);
for (let i = 0; i < 29; i++) {RandomSmileList.push(`https://sticker.inari.site/rwebp/${Math.ceil(Math.random()*6930)}.webp`);}
for (let i = 1; i < 10; i++) {RandomSmileList.push(`https://sticker.inari.site/rgif/${Math.ceil(Math.random()*2555)}.gif`);}

// 自定义
let userimgst=localStorage.userimgst;
userimgst==undefined?userimgst=`["https://sticker.inari.site/null.jpg"]`:userimgst=localStorage.userimgst;
const UserSmileList = JSON.parse(userimgst);const UsersSmileList = [];
if (customize.UseOldNum == true){for (let i = 0; i < UserSmileList.length; i++){UsersSmileList.push(`${UserSmileList[i]}?num=${i+1}`);}}
else {for (let i = 0; i < UserSmileList.length; i++){UsersSmileList.push(`${UserSmileList[i]}#num=${i+1}`);}}

// 来自本地数据源的表情贴纸
let locAuth=sessionStorage.localSmile,localSmile=[];
customize.lcimglists==false?loconsticker=[0,1,2,3,4,5,6,7,8,9]:loconsticker=customize.lcimglists;
for(let t=0; t<loconsticker.length; t++){localSmile[t]=LocalRaws[loconsticker[t]];}
if(locAuth==null){for(let t=0; t<localSmile.length; t++){localSmile[t].addr=[];
for (let i=0;i<localSmile[t].numstart.length;i++){
for(let ii=localSmile[t].numstart[i];ii<localSmile[t].numend[i];ii++){
localSmile[t].addr.push(localSmile[t].url1[i]+ii+localSmile[t].url2[i]);}}}
sessionStorage.setItem('localSmile', JSON.stringify(localSmile));}
localSmile=JSON.parse(sessionStorage.localSmile)

// 来自在线数据源的表情贴纸
let olAuth=sessionStorage.OnlineSmile;
if(olAuth==null){
  let onlineSmile=OnlineRaws;
  for(let s=0; s<onlineSmile.length; s++){
    onlineSmile[s].addr=[];for (let i=0;i<onlineSmile[s].numstart.length;i++){
      for(let ii=onlineSmile[s].numstart[i];ii<onlineSmile[s].numend[i];ii++){
        onlineSmile[s].addr.push(onlineSmile[s].url1[i]+ii+onlineSmile[s].url2[i]);
      }}}sessionStorage.setItem('OnlineSmile', JSON.stringify(onlineSmile));
}
OnlineSmile=JSON.parse(sessionStorage.OnlineSmile)



/**
 * 表情菜单
 */
const MenuList = {
    KfSmile: {datatype: 'imageLink', title: '小企鹅',desc: 'KF论坛的小企鹅表情', addr: KfSmileList, ref: KfSmileCodeList},
    Shortcut: {
        datatype: 'plain',
        title: '快捷',
        desc: '发帖实用BBcode',
        addr: [
            '[sell=100][/sell]', '[quote][/quote]', '[hide=100][/hide]', '[code][/code]', '[strike][/strike]', '[fly][/fly]','[color=#00FF00][/color]',
            '[b][/b]', '[u][/u]', '[i][/i]', '[hr]', '[backcolor=][/backcolor]', '[url=][/url]','[img][/img]','[table][/table]','[tr][/tr]','[td][/td]',
            '[align=left][/align]','[align=center][/align]','[align=right][/align]','[audio][/audio]','[video][/video]','[email][/email]','[list][/list]',
            '[/align]这里是签名档内容，可以随意修改，支持bbcode，实验性功能，喵拉手机版不显示，编辑帖子后如果有修改说明会导致喵拉手机版重复显示两次内容。',
            '[align=center][img]此处替换为自定义图片url[/img][/align][align=center][backcolor=#FFFFFF][size=3]  [b]在此输入自定义文字[/b]  [/size][/backcolor][/align]'
        ],
        ref: [
            '出售贴sell=售价', '引用', '隐藏hide=神秘等级', '插入代码', '删除线', '跑马灯', '文字颜色', '粗体', '下划线','斜体', '水平线', '背景色', '插入链接',
            '插入图片','插入表格','插入表格行','插入表格列','左对齐','居中','右对齐','插入音频','插入视频','Email','插入列表','签名档[实验性功能]','自定义表情配文字'
        ]
    },
    Random:   {datatype: 'image', title: '随机', desc:'从随机表情贴纸池里随机抽取表情贴纸！', addr: RandomSmileList},
    Userimg:  {datatype: 'image', title: '自定义', desc:'你自己新增的表情贴纸都在这里！', addr: UsersSmileList},
    Kaomoji: {
        datatype: 'plain',
        title: ':)',
        desc: '颜文字',
        addr: [
            '(●・ 8 ・●)', '╰(๑◕ ▽ ◕๑)╯', '(ゝω・)', '〜♪♪', '(ﾟДﾟ≡ﾟДﾟ)', '(＾o＾)ﾉ', '(|||ﾟДﾟ)', '(`ε´ )', '(╬ﾟдﾟ)', '(|||ﾟдﾟ)', '(￣∇￣)', '(￣3￣)', '(￣ｰ￣)',
            '(￣ . ￣)', '(￣︿￣)', '(￣︶￣)', '(*´ω`*)', '(・ω・)', '(⌒▽⌒)', '(￣▽￣）', '(=・ω・=)', '(･∀･)', '(｀・ω・´)', '(〜￣△￣)〜', '(°∀°)ﾉ', '(￣3￣)',
            '╮(￣▽￣)╭', '( ´_ゝ｀)', 'のヮの', '(ﾉ؂< ๑）诶嘿☆～', '(<_<)', '(>_>)', '(;¬_¬)', '(▔□▔)/', '(ﾟДﾟ≡ﾟдﾟ)!?', 'Σ(ﾟдﾟ;)', 'Σ( ￣□￣||)', '(´；ω；`)',
            '（/TДT)/', '(^・ω・^ )', '(｡･ω･｡)', '(oﾟωﾟo)', '(●￣(ｴ)￣●)', 'ε=ε=(ノ≧∇≦)ノ', '(´･_･`)', '(-_-#)', '（￣へ￣）', '(￣ε(#￣) Σ', 'ヽ(`Д´)ﾉ', '( ´ρ`)',
            '(╯°口°)╯(┴—┴', '（#-_-)┯━┯', '_(:3」∠)_', '(笑)','(汗)', '(泣)', '(苦笑)', '(´・ω・`)', '(╯°□°）╯︵ ┻━┻','(╯‵□′)╯︵┻━┻', '( ﾟωﾟ)',
            '(　^ω^)', '(｡◕∀◕｡)', '/( ◕‿‿◕ )\\', 'ε٩( º∀º )۶з', '(￣ε(#￣)☆╰╮(￣▽￣///)', '（●´3｀）~♪', '_(:з」∠)_', 'хорошо!', '＼(^o^)／','(•̅灬•̅ )',
            '(ﾟДﾟ)', '(；°ほ°)', 'ε=ε=ε=┏(゜ロ゜;)┛', '⎝≧⏝⏝≦⎠', 'ヽ(✿ﾟ▽ﾟ)ノ', '|•ω•`)', '小学生は最高だぜ！！', '焔に舞い上がるスパークよ、邪悪な異性交際に、天罰を与え！'
        ]
    },
}
for(let s=0; s<localSmile.length; s++){MenuList[`${localSmile[s].name}`]={datatype: 'image', title: localSmile[s].title ,desc:localSmile[s].desc, addr: localSmile[s].addr};}
for(let s=0; s<OnlineSmile.length; s++){MenuList[`${OnlineSmile[s].name}`]={datatype: 'image', title: OnlineSmile[s].title ,desc:OnlineSmile[s].desc, addr: OnlineSmile[s].addr};}



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
        html += `<a class="kfe-sub-menu" data-key="${key}" href="#" title="${data.desc}">${data.title}</a>`;
    });
    return html;
};

/**
 * 创建容器
 * @param textArea 文本框
 */
const createContainer = function (textArea) {
    let $container = $(`<div class="kfe-container"><div class="kfe-menu">
    <input type= "file"  class="kfe-user-p" accept="image/*" style="display:none" >
    <input type="button" class="kfe-user-y" value="云同步">
    <input type="button" class="kfe-user-i" value="自定义">
    <input type="button" class="kfe-user-g" value="表情组设置">&nbsp;
    <span class="kfe-close-panel" title="版本${version}; 本分支由mistakey维护，是eddie32插件喵拉布丁分支的分支" style="cursor: pointer;"><b>⑨</b></span>
    ${getSubMenuHtml()}<span class="kfe-close-panel">[-]</span>&nbsp;
    <div class="kfe-diy-panel" style="display:none">
    <input type="button" class="kfe-user-c" value="添加贴纸">&nbsp;
    <input type="button" class="kfe-user-r" value="导出贴纸">&nbsp;
    <input type="button" class="kfe-user-u" value="修改贴纸">&nbsp;
    <input type="button" class="kfe-user-d" value="删除贴纸">&nbsp;
    <input type="button" class="kfe-user-s" value="个性设置">
    <div class="kfe-conf-panel" style="display:none"><table><tr>
    <td><li>看板娘图片URL<br><input type="text" class="conftext" id="kanbanimg" value="">&nbsp;</li></td>
    <td><li>看板娘/粘贴图片预览大小<br><input type="number" class="conftext" id="kanbansize" value="">&nbsp;</li></td>
    <td><li>表情贴纸组数据源仓库URL<br><input type="text" class="conftext" id="onlineraw" value="">&nbsp;</li></td>
    <td><li>已选在线贴纸组ID数组（只读）<br><input type="text" class="conftext" id="olimglists" disabled="true" value="">&nbsp;</li></td></tr><tr>
    <td><li><input type="checkbox" class="confbt" id="notauthed" value="auth">显示未经验证的数据源</li></td>
    <td><li><input type="checkbox" class="confbt" id="UseOldNum" value="UseOldNum">自定义贴纸使用旧的计数法</li></td>
    <td><li><input type="checkbox" class="confbt" id="writeable" value="writeable">允许在此处编辑ID数组<span style="cursor: help;color:red" title="请确定你知道你在做什么！在此修改（特别是增加！）已选在线贴纸组ID数组可能会发生不可预知的错误！">&nbsp;【!】</span></li></li></td>
    <td><li><input type="button" class="kfe-conf-default" value="恢复默认">&nbsp;&nbsp;&nbsp;<input type="button" class="kfe-conf-close" value="关闭列表"></li></td>
    </tr></table></div></div><div class="kfe-acc-panel" style="display:none">
    <input type="button" class="kfe-user-reg" value="注册">&nbsp;
    <input type="button" class="kfe-user-log" value="登录">&nbsp;
    <input type="button" class="kfe-user-img" value="绑定图床">&nbsp;
    <input type="button" class="kfe-user-ltc" value="上传云端">&nbsp;
    <input type="button" class="kfe-user-ctl" value="恢复本地">&nbsp;
    <input type="button" class="kfe-user-out" value="退出登录"></div>
    <div class="kfe-bqz-panel" style="display:none">
    <input type="button" class="kfe-user-loc" value="启用的本地表情">&nbsp;
    <input type="button" class="kfe-user-oln" value="浏览表情组商店">&nbsp;
    <input type="button" class="kfe-user-raw" value="商店数据源设置">&nbsp;
    <div class="kfe-loc-panel" style="display:none"><table><tr>
    <td><li><input type="checkbox" class="locbt" id="ng0" value="0">AC娘</li></td>
    <td><li><input type="checkbox" class="locbt" id="ng1" value="1">S1麻将脸</li></td>
    <td><li><input type="checkbox" class="locbt" id="ng2" value="3">看板娘小B</li></td>
    <td><li><input type="checkbox" class="locbt" id="ng3" value="4">微博贴吧</li></td>
    <td><li><input type="checkbox" class="locbt" id="ng4" value="2">阿卡林</li></td></tr><tr>
    <td><li><input type="checkbox" class="locbt" id="ng5" value="5">暹罗猫小红豆</li></td>
    <td><li><input type="checkbox" class="locbt" id="ng6" value="6">LoveLive</li></td>
    <td><li><input type="checkbox" class="locbt" id="ng7" value="7">少女歌剧</li></td>
    <td><li><input type="checkbox" class="locbt" id="ng8" value="8">公主连结R</li></td>
    <td><li><input type="checkbox" class="locbt" id="ng9" value="9">邦邦</li></td>
    <td><input type="button" class="kfe-loc-close"value="关闭列表"></td></tr>
    </table></div></div></div></div>`).insertBefore($(textArea));
    if(isKfMobile==true){
         $(`<button class="btn btn-secondary upload-image-btn ml-1" title="上传图片" onclick="$('.kfe-user-p').click();">
            <i class="fa fa-picture-o" aria-hidden="true"></i>上传图片</button>`).insertAfter($("#smileDropdownBtn"));}
    else{$(`<a>&nbsp;</a><input type="button" class="kfe-user-t" value="上传图片" onclick="$('.kfe-user-p').click();">`).insertAfter($(":submit"));}
    // 文本区域直接上传图片并预览
    document.querySelector('textarea').addEventListener('paste', (event) => {
        event.preventDefault();
        // 修复粘贴文字功能
        addCode(textArea,event.clipboardData.getData('text'));
        const pd = event.clipboardData.items[0]
        if (!(/^image\/[jpeg|png|gif|jpg]/.test(pd.type))) {
            return;
        }
        const file = event.clipboardData.items[0].getAsFile()
        // 让文件名使用时间戳
        let name = JSON.stringify(new Date().getTime());
        const files = new File([file], name + "." + file.name.substr(file.name.lastIndexOf('.') + 1), {
            type: file.type,
            lastModified: file.lastModified,
        });
        let formData = new FormData();
        formData.append('file', files);
        let reader = new FileReader();
        reader.onload = function({target}) {
            setTimeout(() => {
                $(".imgpreview").attr('src', target.result)
            }, 400)
            setTimeout(() => {
                if(isKfMobile==true){
                    $(".imgpreview").attr('src', 'https://sticker.inari.site/favicon.ico')}
                else{$(".imgpreview").attr('src', kanbanmsume)}
            }, 4000)
        }
        reader.readAsDataURL(files);
        //验证登录，使用token或游客上传
        let authdata = localStorage.logindata;
        let oncealert =localStorage.alertdata;
        if(authdata==null){
            $.ajax({
                    url: 'https://up.inari.site/api/v1/upload',
                    type: 'POST',
                    dataType: 'json',
                    data: formData,
                    // 告诉jQuery不要去设置Content-Type请求头
                    contentType: false,
                    // 告诉jQuery不要去处理发送的数据
                    processData: false,
                })
                    .done(data => {
                    if(data.status==true){
                        let inaridata=data.data;
                        let inarilinks=inaridata.links;
                        setTimeout(() => {
                          alert('游客上传成功！建议注册登录云同步账号并绑定图床账号！');
                        }, 1000)
                        addCode(textArea, inarilinks.bbcode);
                    }
                    else if(data.status==false){
                        alert(data.message);
                    }
                    else{
                        alert('发生未知错误，'+data);
                    }
                })
                    .fail(data => {
                    alert('图片上传失败，可能是网络原因。');
                });
        }
        else{
            let authList = JSON.parse(authdata);
            if(authList.length==2){
                $.ajax({
                    url: 'https://up.inari.site/api/v1/upload',
                    type: 'POST',
                    dataType: 'json',
                    data: formData,
                    // 告诉jQuery不要去设置Content-Type请求头
                    contentType: false,
                    // 告诉jQuery不要去处理发送的数据
                    processData: false,
                })
                    .done(data => {
                    if(data.status==true){
                        let inaridata=data.data;
                        let inarilinks=inaridata.links;
                        if(oncealert==null){
                          alert('游客上传成功！建议绑定up.inari.site图床账号到云同步账号！');
                          let alertarray=["don't alert"];
                          localStorage.setItem('alertdata',JSON.stringify(alertarray));
                          addCode(textArea, inarilinks.bbcode);
                       }
                       else {
                         addCode(textArea, inarilinks.bbcode);
                       }
                    }
                    else if(data.status==false){
                        alert(data.message);
                    }
                    else{
                        alert('发生未知错误，'+data);
                    }
                })
                    .fail(data => {
                    alert('图片上传失败，可能是网络原因。');
                });
            }
            else if(authList.length==3){
                $.ajax({
                    url: 'https://up.inari.site/api/v1/upload',
                    type: 'POST',
                    dataType: 'json',
                    data: formData,
                    // 告诉jQuery不要去设置Content-Type请求头
                    contentType: false,
                    // 告诉jQuery不要去处理发送的数据
                    processData: false,
                    //设置Header的token
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer "+authList[2]);
                    }
                })
                    .done(data => {
                    if(data.status==true){
                        let inaridata=data.data;
                        let inarilinks=inaridata.links;
                        addCode(textArea, inarilinks.bbcode);
                    }
                    else if(data.status==false){
                        alert(data.message);
                    }
                    else{
                        alert('发生未知错误，'+data);
                    }
                })
                    .fail(data => {
                    alert('图片上传失败,可能是网络原因。');
                });
            }
        }
    });
    $container.on('click', '.kfe-sub-menu', function (e) {
        e.preventDefault();
        $container.find('.kfe-acc-panel').hide();
        $container.find('.kfe-bqz-panel').hide();
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
    }).on('click', '.kfe-user-g', function (e) {
        e.preventDefault();
        $container.find('.kfe-smile-panel').hide();
        $container.find('.kfe-diy-panel').hide();
        $container.find('.kfe-acc-panel').hide();
        let $this = $(this);
        $container.find('.kfe-user-g').removeClass('kfe-user-g-active');
        $this.addClass('kfe-user-g-active');
        $container.find('.kfe-diy-panel').hide();
        let $panel = $container.find(`.kfe-bqz-panel`);
        $panel.show();
    }).on('click', '.kfe-user-loc', function (e) {
        if(customize.lcimglists==false){for(let i=0;i<10;i++){$("#ng"+i).attr("checked",true);}}
        else if(customize.lcimglists!=false){let checklcg=customize.lcimglists;for(let i=0;i<checklcg.length;i++){$("#ng"+checklcg[i]).attr("checked",true);}}
        else{alert("发生错误")};
        $container.find('.kfe-diy-panel').hide();
        let $this = $(this);
        $container.find('.kfe-user-loc').removeClass('kfe-user-loc-active');
        $this.addClass('kfe-user-loc-active');
        $container.find('.kfe-loc-panel').hide();
        let $panel = $container.find(`.kfe-loc-panel`);
        $panel.show();
    }).on('click', '.locbt', function (e) {
        let thenum=e.target.value,locimgs=customize.lcimglists;
        if(e.target.checked==false){locimgs = locimgs.filter(item=>{return item!=thenum})}
        else{locimgs.push(thenum);}
        customize.lcimglists=locimgs;
        localStorage.setItem('StickerConf',JSON.stringify(customize));
        sessionStorage.removeItem('localSmile');
    }).on('click', '.kfe-loc-close', function (e) {
        $container.find('.kfe-loc-panel').hide();
    }).on('click', '.kfe-conf-close', function (e) {
        $container.find('.kfe-conf-panel').hide();
    }).on('click', '.kfe-user-oln', function (e) {
         kfShowDialog();
    }).on('click', '.kfe-user-raw', function (e) {
        let theonlineraw = prompt("在线表情组商店数据仓库源设置，默认使用inari源",'https://api.inari.site/?s=App.Sticker.');
        let safeornot = confirm("是否显示未经审核的表情贴纸组？");
        if(theonlineraw)customize.onlineraw=theonlineraw;
        customize.notauthed=safeornot;
        localStorage.setItem('StickerConf',JSON.stringify(customize));
    }).on('click', '.kfe-user-i', function (e) {
        e.preventDefault();
        $container.find('.kfe-acc-panel').hide();
        $container.find('.kfe-bqz-panel').hide();
        let $this = $(this);
        $container.find('.kfe-user-i').removeClass('kfe-user-i-active');
        $this.addClass('kfe-user-i-active');
        $container.find('.kfe-diy-panel').hide();
        let $panel = $container.find(`.kfe-diy-panel`);
        $panel.show();
    }).on('click', '.kfe-user-y', function (e) {
        e.preventDefault();
        $container.find('.kfe-smile-panel').hide();
        $container.find('.kfe-diy-panel').hide();
        $container.find('.kfe-bqz-panel').hide();
        let $this = $(this);
        $container.find('.kfe-user-y').removeClass('kfe-user-y-active');
        $this.addClass('kfe-user-y-active');
        $container.find('.kfe-acc-panel').hide();
        let $panel = $container.find(`.kfe-acc-panel`);
        $panel.show();
    }).on('click', '.kfe-user-c', function (e) {
        e.preventDefault();
        let userimgc = prompt("请输入要添加的贴纸的URL，添加多个请用半角,隔开贴纸URL（添加后刷新页面生效）", "https://sticker.inari.site/inari.png");
        if (!userimgc) return;let userimgcmt = userimgc.split(',');let addList = [];
        for (let mt = 0; mt < userimgcmt.length; mt++) {
            //含http/https协议前缀的完整图片url，请确保未开启防盗链
            if (/(http:\/\/|https:\/\/).*.(png|jpg|jpeg|gif|webp|bmp|tif)+.*$/i.test(userimgcmt[mt])) {addList.push(userimgcmt[mt]);}
            //任意无协议前缀的图片url，默认增加https协议前缀
            else if (/[a-zA-Z0-9\-\.]+\.+[a-zA-Z]+\/.*.(png|jpg|jpeg|gif|webp|bmp|tif)+.*$/i.test(userimgcmt[mt])) {addList.push('https://'+userimgcmt[mt]);}
            //由sticker.inari.site托管的用户贴纸组
            else if (/[A-Za-z0-9\_\/]+\/+[0-9\/]+.(png|jpg|jpeg|gif|webp)$/i.test(userimgcmt[mt])) {addList.push('https://sticker.inari.site/usr/'+userimgcmt[mt]);}
        }if (addList.length < userimgcmt.length){alert('含有非法输入，请检查是否有图片url错误');}
        if (addList.length > 0) {let userSmileList = [];
            if (localStorage.userimgst) {try {userSmileList = JSON.parse(localStorage.userimgst);}
                catch (ex) {console.log(ex);userSmileList = [];}}
            userSmileList = [...userSmileList, ...addList];
            localStorage.setItem('userimgst', JSON.stringify(userSmileList));
            alert('贴纸已添加');location.reload();}
    }).on('click', '.kfe-user-r', function (e) {
        e.preventDefault();if (UserSmileList !="https://sticker.inari.site/null.jpg"){prompt("自定义表情贴纸已导出，请复制",UserSmileList)}
        else {alert("自定义表情贴纸为空！");}
    }).on('click', '.kfe-user-u', function (e) {
        e.preventDefault();let userimgu = prompt("请输入要替换的贴纸的序号", "1");
        if (/[0-9]$/i.test(userimgu)) {let userimgst = localStorage.userimgst,UserSmileList = JSON.parse(userimgst);
        if (userimgu > UserSmileList.length) {alert('序号超出贴纸数，请检查');}
        else if (userimgu == 0) {alert('非法输入，请检查！');}else if (userimgu <= UserSmileList.length) {
        let usreplace = prompt("请输入用于替换的图片url", "https://sticker.inari.site/inari.png"),j = userimgu;
        if (/(http:\/\/|https:\/\/).*.(png|jpg|jpeg|gif|webp|bmp|tif)+.*$/i.test(usreplace)) {
        if (confirm('确定替换序号为'+userimgu+'的贴纸吗？这是最后一次确认！')) {
        UserSmileList[j - 1] = usreplace;localStorage.setItem('userimgst', JSON.stringify(UserSmileList));
        alert('已替换指定序号的贴纸');location.reload();}}
        else if (usreplace == null) { }else if (usreplace == 0) {alert('非法输入，请检查！');}else {alert('非法输入，请检查！');}}
        else if (userimgu == null) { }else {alert('非法输入，请检查！');}}
    }).on('click', '.kfe-user-d', function (e) {
        e.preventDefault();
        if (confirm('确定删除自定义表情贴纸吗？')) {
        if (confirm('【确定】清空自定义贴纸，【取消】删除指定贴纸。')) {
        if (confirm('确定【清空自定义贴纸】吗？这是【最后一次】确认')) {
        localStorage.removeItem('userimgst');
        alert('已清空自定义贴纸');location.reload();}}
        else {let userimgd = prompt("请输入要删除的贴纸的序号", "1");
        if (/[0-9]$/i.test(userimgd)) {
        let userimgst = localStorage.userimgst,UserSmileList = JSON.parse(userimgst);
        if (userimgd > UserSmileList.length) {alert('序号超出贴纸数，请检查');}
        else if (userimgd == 0) {alert('非法输入，请检查！');}
        else if (userimgd <= UserSmileList.length) {
        if (confirm('确定删除【序号为'+userimgd+'的贴纸】吗？这是【最后一次】确认！')) {
        for (let i = userimgd; i <= UserSmileList.length; i++) {UserSmileList[i - 1] = UserSmileList[i];}
        UserSmileList.pop();localStorage.setItem('userimgst', JSON.stringify(UserSmileList));
        alert('已删除指定序号的贴纸！');location.reload();}}
        else {alert('非法输入，请检查！')}}else if (userimgd == null){ }else {alert('非法输入，请检查！')}}}
    }).on('click', '.kfe-user-s', function (e) {
        // 载入个性化设置状态
        $("#kanbanimg").attr("value",customize.kanbanimg);
        $("#kanbansize").attr("value",customize.kanbansize);
        $("#onlineraw").attr("value",customize.onlineraw);
        $("#olimglists").attr("value",customize.olimglists);
        $("#notauthed").attr("checked",customize.notauthed);
        $("#UseOldNum").attr("checked",customize.UseOldNum);
        console.log(customize.olineraw)
        let $panel = $container.find(`.kfe-conf-panel`);
        $panel.show();
    }).on('blur', '#kanbanimg', function (e) {
        customize.kanbanimg=e.target.value;
        localStorage.setItem('StickerConf',JSON.stringify(customize));
    }).on('blur', '#kanbansize', function (e) {
        customize.kanbansize=e.target.value;
        localStorage.setItem('imgpvpc',JSON.stringify(["5px","100px"]));
        localStorage.setItem('StickerConf',JSON.stringify(customize));
    }).on('blur', '#onlineraw', function (e) {
        customize.onlineraw=e.target.value;
        localStorage.setItem('StickerConf',JSON.stringify(customize));
    }).on('blur', '#olimglists', function (e) {
        alert('暂未实现的功能')
        // 启用的在线贴纸组
        e.target.value==""?customize.olimglists=[]:customize.olimglists=qc(e.target.value.match(/\d+/g).map(o => +o));


        // 刷新在线贴纸储存库
        //let flashOlRaws=[];
        //localStorage.setItem('onlineraws',JSON.stringify(flashOlRaws));
        //localStorage.setItem('StickerConf',JSON.stringify(customize));
        sessionStorage.removeItem('OnlineSmile')


    }).on('click', '.kfe-conf-default', function (e) {
        localStorage.setItem('StickerConf',JSON.stringify({"kanbanimg":"https://sticker.inari.site/truenight.gif","kanbansize":"64","onlineraw":"https://api.inari.site/?s=App.Sticker.","notauthed":false,"UseOldNum":false,"lcimglists":customize.lcimglists,}));
        localStorage.setItem('imgpvpc',JSON.stringify(["5px","100px"]));
    }).on('click', '#notauthed', function (e) {
        customize.notauthed=e.target.checked;
        localStorage.setItem('StickerConf',JSON.stringify(customize));
    }).on('click', '#UseOldNum', function (e) {
        customize.UseOldNum=e.target.checked;
        localStorage.setItem('StickerConf',JSON.stringify(customize));
    }).on('click', '#writeable', function (e) {
        e.target.checked?$("#olimglists").attr("disabled",false):$("#olimglists").attr("disabled",true);
    }).on('click', '.kfe-user-ctl', function (e) {
        e.preventDefault();if (localStorage.logindata!=null){
        let tokendata = localStorage.logindata,tokenList = JSON.parse(tokendata);
        let syncid=tokenList[0],synctoken=tokenList[1];
        //第一步：创建需要的对象
        let dlRequest = new XMLHttpRequest();
        //第二步：打开连接
        dlRequest.open('POST', 'https://api.inari.site/?s=App.User_User.picsdata&user_id='+syncid+'&token='+synctoken, true);
        //设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
        dlRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        //发送请求 将情头体写在send中
        dlRequest.send('name=teswe&ee=ef');
        //请求后的回调接口，可将请求成功后要执行的程序写在其中
        dlRequest.onreadystatechange = function () {
        //验证请求是否发送成功
        if (dlRequest.readyState == 4 && dlRequest.status == 200) {
        //获取到服务端返回的数据
        let dljson = dlRequest.responseText,download=JSON.parse(dljson);
        if (download.ret==200){
        if (confirm('确定同步【云端数据到本地】吗？这是最后一次确认！')) {
        let dldata=download.data,dlpicsList=dldata.picsdata;if (dlpicsList !=""){
        localStorage.setItem('userimgst',JSON.stringify(dlpicsList.split(',')));
        alert("已同步云端数据到本地！");location.reload();}
        else{alert("云端数据为空！同步到本地操作已取消！");}}}
        else{alert('Token已失效，请重新登录！');}}
        else if(dlRequest.readyState == 4 && dlRequest.status != 200){
        alert('发生错误！错误状态码：'+dlRequest.status)}}}
        else{alert('未找到有效Token，请先登录！');}
    }).on('click', '.kfe-user-ltc', function (e) {
        e.preventDefault();if (localStorage.logindata!=null){
        let tokenList = JSON.parse(localStorage.logindata),syncid=tokenList[0],synctoken=tokenList[1];
        if (confirm('确定同步【本地数据到云端】吗？这是最后一次确认！')) {
        let userimgst = localStorage.userimgst;
        if (userimgst !=null){let UserSmileList = JSON.parse(userimgst),upRequest = new XMLHttpRequest();
        upRequest.open('POST', 'https://api.inari.site/?s=App.User_User.picsupdate&user_id='+syncid+'&token='+synctoken+'&picsdata='+UserSmileList, true);
        upRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        upRequest.send('name=teswe&ee=ef');upRequest.onreadystatechange = function () {
        if (upRequest.readyState == 4 && upRequest.status == 200) {
        let upjson = upRequest.responseText,upload=JSON.parse(upjson);
        if (upload.ret==200){alert("已同步本地数据到云端！");}
        else{alert('Token已失效，请重新登录！');}}
        else if(upRequest.readyState == 4 && upRequest.status != 200){
        alert('发生错误！错误状态码：'+upRequest.status);}}}
        else{alert('本地数据为空！同步到云端操作已取消！');}}}
        else{alert('未找到有效Token，请先登录！');}
    }).on('click', '.kfe-user-log', function (e) {
        e.preventDefault();if(localStorage.logindata==null){let username = prompt("用户名",'username');
        if (username!=null&&username.length<=50){let password = prompt("密码",'password')
        if (password!=null&&password.length>=6&&password.length<=20){let loginRequest = new XMLHttpRequest();
        loginRequest.open('POST', 'https://api.inari.site/?s=App.User_User.Login&username='+username+'&password='+password, true);
        loginRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        loginRequest.send('name=teswe&ee=ef');loginRequest.onreadystatechange = function () {
        if (loginRequest.readyState == 4 && loginRequest.status == 200) {
        let loginjson = loginRequest.responseText,login=JSON.parse(loginjson);
        if (login.ret==200){let logindata=login.data;if (logindata.is_login==true){
        localStorage.setItem('logindata',JSON.stringify([logindata.user_id,logindata.token]));let getokenRequest = new XMLHttpRequest();
        getokenRequest.open('POST', 'https://api.inari.site/?s=App.User_User.Tutoken&user_id='+logindata.user_id+'&token='+logindata.token, true);
        getokenRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        getokenRequest.send('name=teswe&ee=ef');getokenRequest.onreadystatechange = function () {
        if (getokenRequest.readyState == 4 && getokenRequest.status == 200) {
        let getokentext = getokenRequest.responseText,getokenjson=JSON.parse(getokentext);
        if (getokenjson.ret==200){let tkdata=getokenjson.data;let gtoken=tkdata.tutoken;if (gtoken !=""){
        localStorage.setItem('logindata',JSON.stringify([logindata.user_id,logindata.token,gtoken]));alert('你可以进行同步操作了！');}
        else{confirm('检测到没有绑定图床账号，是否绑定？不绑定则上传图片将使用游客上传！')?$('.kfe-user-img').click():console.log('不绑定');}}
        else{alert('你依然可以进行同步操作。检测是否绑定图床账号失败！返回码：'+getokenjson.ret);}}
        else if(getokenRequest.readyState == 4 && getokenRequest.status != 200){
        alert('你依然可以进行同步操作。检测是否绑定图床账号失败！异常的请求！状态码：'+getokenRequest.status);}}}
        else if(logindata.is_login==false){alert('Oops！用户名或密码错误！请检查！');}}
        else{login.ret==400?alert('Oops！该账号还没有注册，请注册！'):alert('Oops！异常的错误！返回码：'+login.ret);}}}}
        else{password==null?alert('取消登录'):alert('密码长度不合规，密码位数应在6-20位范围');}}
        else {username==null?alert('取消登录'):alert('用户名长度不合规，用户名位数应在1-50位范围');}}
        else{alert('请勿重复登录！如需更换账号或Token过期请先登出再登录！')}
    }).on('click', '.kfe-user-img', function (e) {
        e.preventDefault();if(localStorage.logindata!=null){
        let tokenList = JSON.parse(localStorage.logindata),syncid=tokenList[0],synctoken=tokenList[1],getokenRequest = new XMLHttpRequest();
        getokenRequest.open('POST', 'https://api.inari.site/?s=App.User_User.Tutoken&user_id='+syncid+'&token='+synctoken, true);
        getokenRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        getokenRequest.send('name=teswe&ee=ef');getokenRequest.onreadystatechange = function () {
        if (getokenRequest.readyState == 4 && getokenRequest.status == 200) {
        let getokentext = getokenRequest.responseText,getokenjson=JSON.parse(getokentext);
        if (getokenjson.ret==200){let tkdata=getokenjson.data,gtoken=tkdata.tutoken;
        if (gtoken !=""){localStorage.setItem('logindata',JSON.stringify([syncid,synctoken,gtoken]));alert('检测到您已绑定图床账号！');}
        else{let inariuser = prompt("inari图床账号邮箱",'example@example.mail'),inaripass = prompt("inari图床账号密码",'password'),formData = '{ "email":"'+inariuser+'" , "password":"'+inaripass+'" }';
        $.ajax({url: 'https://up.inari.site/api/v1/tokens',type: 'POST',dataType: 'json',data:formData,contentType:"application/json",processData: false,})
        .done(data =>{if(data.status==true){let tokendata= data.data,token=tokendata.token,tokenarray=[syncid,synctoken,token];
        localStorage.setItem('logindata',JSON.stringify(tokenarray));let tokenRequest = new XMLHttpRequest();
        tokenRequest.open('POST', 'https://api.inari.site/?s=App.User_User.tupdate&user_id='+syncid+'&token='+synctoken+'&tupdate='+token, true);
        tokenRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        tokenRequest.send('name=teswe&ee=ef');tokenRequest.onreadystatechange = function () {
        if (tokenRequest.readyState == 4 && tokenRequest.status == 200) {
        let tokentext = tokenRequest.responseText,tokenjson=JSON.parse(tokentext);
        if (tokenjson.ret==200){alert("已绑定图床账号！")}else{alert('图床账号绑定失败！'+tokenjson.msg)}
        }else if(tokenRequest.readyState == 4 && tokenRequest.status != 200){
        alert('图床账号绑定失败！异常请求状态码：'+tokenRequest.status)
        }}}else if(data.status==false){alert(data.message)}})
        .fail(data => {alert('Oops！图床账号绑定失败！可能是服务器错误或网络问题！')});
        }}else{alert('检测是否绑定了图床账号失败！返回码：'+getokenjson.ret);}
        }else if(getokenRequest.readyState == 4 && getokenRequest.status != 200){alert('异常的请求！状态码：'+getokenRequest.status);}}}
        else{alert('请登录云同步账号后再进行绑定！')}
    }).on('click', '.kfe-user-reg', function (e) {
        e.preventDefault();if(localStorage.logindata==null){
        let regname = prompt("用户名，1-50位，只支持英文、数字和有限的特殊符号如@_",'username');
        if (regname.length>=1&&regname.length<=20){let regpswd1 = prompt("输入6-20位密码，只支持英文、数字和有限的特殊符号如@_",'password');
        let regpswd2 = prompt("确认密码",'password');if (regpswd1.length>=6&&regpswd1.length<=20){
        if (regpswd1==regpswd2){let regRequest = new XMLHttpRequest();regRequest.open('POST', 'https://api.inari.site/?s=App.User_User.Register&username='+regname+'&password='+regpswd2, true);
        regRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");regRequest.send('name=teswe&ee=ef');regRequest.onreadystatechange = function () {
        if (regRequest.readyState == 4 && regRequest.status == 200) {let regjson = regRequest.responseText;let reg=JSON.parse(regjson);if (reg.ret==200){let loginRequest = new XMLHttpRequest();
        loginRequest.open('POST', 'https://api.inari.site/?s=App.User_User.Login&username='+regname+'&password='+regpswd2, true);
        loginRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");loginRequest.send('name=teswe&ee=ef');loginRequest.onreadystatechange = function () {
        if (loginRequest.status === 200 && loginRequest.readyState === 4) {let loginjson = loginRequest.responseText;let login=JSON.parse(loginjson);let logindata=login.data;
        localStorage.setItem('logindata',JSON.stringify([logindata.user_id,logindata.token]));
        if(confirm('是否绑定up.inari.site图床账号？【确定】绑定【取消】则不绑定，上传图片将使用游客上传')){$('.kfe-user-img').click();}
        else{alert("已自动登录，现在你可以进行同步操作了！");}}}}else if (reg.ret!=200){alert('Oops！'+reg.msg+'注册失败！返回码：'+reg.ret);}}
        else if(regRequest.readyState == 4 && regRequest.status != 200){alert('用户名或密码不合规，只支持英文、数字和有限的特殊符号如@_');}}}
        else{alert("两次密码不一致，注册操作已取消！");}}else{alert("密码长度不合规，须在6-20位范围内，注册操作已取消！")}}
        else{alert("用户名长度不合规，须在1-50位范围内，注册操作已取消！");}}
        else{alert("检测到您已登录！如需更换账号请先登出！");}
    }).on('click', '.kfe-user-out', function (e) {
        localStorage.removeItem('logindata');alert('已登出账号！');
    }).on('change', '.kfe-user-p', function (e) {
        e.preventDefault();let formData = new FormData(),file = this.files[0];
        formData = new FormData();formData.append('file', file);
        let authdata = localStorage.logindata,oncealert =sessionStorage.Alertless1;
        if(authdata==null){$.ajax({url: 'https://up.inari.site/api/v1/upload',type: 'POST',dataType: 'json',data: formData,contentType: false,processData: false,})
        .done(data => {if(data.status==true){let inaridata=data.data,inarilinks=inaridata.links;
        setTimeout(() => {alert('游客上传成功！建议注册登录云同步账号并绑定图床账号！');},1000);addCode(textArea, inarilinks.bbcode);}
        else if(data.status==false){alert(data.message);}else{alert('发生未知错误，'+data);}})
        .fail(data => {alert('图片上传失败，可能是网络原因。');});}else{let authList = JSON.parse(authdata);if(authList.length==2){
        $.ajax({url: 'https://up.inari.site/api/v1/upload',type: 'POST',dataType: 'json',data: formData,contentType: false,processData: false,})
        .done(data => {if(data.status==true){let inaridata=data.data;let inarilinks=inaridata.links;
        if(sessionStorage.Alertless1==null){alert('游客上传成功！建议绑定up.inari.site图床账号到云同步账号！');
        sessionStorage.setItem('Alertless1',true);addCode(textArea, inarilinks.bbcode);}
        else {addCode(textArea, inarilinks.bbcode);}}else if(data.status==false){alert(data.message);}else{alert('发生未知错误，'+data);}})
        .fail(data => {alert('图片上传失败，可能是网络原因。');});}else if(authList.length==3){
        $.ajax({url: 'https://up.inari.site/api/v1/upload',type: 'POST',dataType: 'json',data: formData,contentType: false,processData: false,beforeSend: function(xhr) {xhr.setRequestHeader("Authorization", "Bearer "+authList[2]);}})
        .done(data => {if(data.status==true){let inaridata=data.data;let inarilinks=inaridata.links;addCode(textArea, inarilinks.bbcode);}
        else if(data.status==false){alert(data.message);}else{alert('发生未知错误，'+data);}})
        .fail(data => {alert('图片上传失败，可能是网络原因。');});}}
    }).find('.kfe-close-panel').click(function () {
        $container.find('.kfe-smile-panel').hide();
        $container.find('.kfe-diy-panel').hide();
        $container.find('.kfe-acc-panel').hide();
        $container.find('.kfe-bqz-panel').hide();
    });
};



/**
 * 表情商店载入
 */
const kfDialogHtml = `
<form>
<div class="kfe-shop_box" id="kf-shop-dialog" style="display: block; top: 8px; left: 336px;">
  <sheader><logo>&nbsp;&nbsp;&nbsp;表情贴纸商店 | Sticker Shop</logo>
    <span class="kfe-close-shop">×&nbsp;&nbsp;</span></sheader>
    <div class="kfe-shop_main" style="max-height: 450px;"><br>
    <div class="kf-list-content"></div>
</div>
<div class="pd_cfg_btns"></div>
<div class="sticker-pages"><div class="kf-list-pagination"></div></div>
<div class="kfe-shop_footer">
    <a target="_blank" href="https://stickers.inari.site/terms">Terms Of Service/服务条款</a> | <a target="_blank" href="https://stickers.inari.site/rules">Privacy Policy/隐私策略</a> | <a target="_blank" href="https://stickers.inari.site/qa">Q&A/常见问题</a> |
    ©mistakey&nbsp;&nbsp;
  </div>
</div>
</form>`;

const kfItemHtml = `
<div class="sticker-item">
<div class="sticker-item-img"><img style="width: 50px; height: 50px;"/></div>
<div class="sticker-item-name"></div>
</div>
`;

const kfPaginationItemHtml = `
<div class="kf-pagination-item-button"></div>
`;
const kfNowPageHtml = `
<div class="kf-pagination-nowpage-button"></div>
`;
const prevNextPageHtml = `
<div class="kf-pagination-prev-next"></div>
`;

// 表情商店数据载入方法
const kfShowDialog = function() {
    let $dialog = $("#kf-shop-dialog")[0];
    $("body").append(kfDialogHtml);
    kfLoadSticker(1);
}
const kfLoadSticker = function(thePage) {
    let success = function(data) {
        loadStickerList(data.data.items);
        loadStickerListPagination(data.data);
    };
    let onlineRaw = customize.onlineraw;
    let authornot;
    customize.notauthed==false?authornot="GetList":authornot="GetListR";
    let PageRequest = new XMLHttpRequest();
    PageRequest.open('POST', onlineRaw+authornot+'&page='+thePage+'&perpage=20', true);
    PageRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    PageRequest.send('name=teswe&ee=ef');
    PageRequest.onreadystatechange = function () {
        if (PageRequest.readyState == 4 && PageRequest.status == 200) {
            let pagejson = PageRequest.responseText;
            let pageload=JSON.parse(pagejson);
            if (pageload.ret==200){
                console.log(pageload);
                success(pageload);
            }
            else{alert('发生异常！'+pageload.msg);}
        }
        else if(PageRequest.readyState == 4 && PageRequest.status != 200){
            alert('发生错误！错误状态码：'+PageRequest.status)
        }
    }
}
const loadStickerList = function(items) {
    let $root = $("#kf-shop-dialog .kf-list-content");
    $root.empty();
    $.each(items, function (_, o) {
        let content = JSON.parse(o.content);
        let $node = $(kfItemHtml).prop("title", content.desc).data("id", o.id).data("content",o.content)
            .find("img").prop("src", content.cover).end()
            .find(".sticker-item-name").text(o.title).end();
        $root.append($node);
    });
}

// 分页模块
const loadStickerListPagination = function(data) {
    let total = Math.ceil(data.total/20);
    let page = data.page;
    let $root = $("#kf-shop-dialog .kf-list-pagination");
    if(page!=1){
        $root.append($(kfPaginationItemHtml).data("id", 1).text("回首页"));
        $root.append($(prevNextPageHtml).data("id", page-1).text("上一页"));

        }
    if(total<12||page<7){
        for(let i = 1; i < page; ++i) {
            let id = i;
            let $node = $(kfPaginationItemHtml).data("id", id).text(id);
            $root.append($node);
        }
        let $node1 = $(kfNowPageHtml).data("id", page).text(page);
        $root.append($node1);
        for(let i = page; i < total; ++i) {
            let id = i+1;
            let $node = $(kfPaginationItemHtml).data("id", id).text(id);
            $root.append($node);
        }
    }
    else if(total>11&&page+5<total){
        for(let i = page-5; i < page; ++i) {
            let id = i;
            let $node = $(kfPaginationItemHtml).data("id", id).text(id);
            $root.append($node);
        }
        let $node1 = $(kfNowPageHtml).data("id", page).text(page);
        $root.append($node1);
        for(let i = page; i < page+5; ++i) {
            let id = i+1;
            let $node = $(kfPaginationItemHtml).data("id", id).text(id);
            $root.append($node);
        }
    }
    else if(total>11&&page+6>total){
        for(let i = total-10; i < page; ++i) {
            let id = i;
            let $node = $(kfPaginationItemHtml).data("id", id).text(id);
            $root.append($node);
        }
        let $node1 = $(kfNowPageHtml).data("id", page).text(page);
        $root.append($node1);
        for(let i = page; i < total; ++i) {
            let id = i+1;
            let $node = $(kfPaginationItemHtml).data("id", id).text(id);
            $root.append($node);
        }
    }
    if(page!=total){
        $root.append($(prevNextPageHtml).data("id", page+1).text("下一页"));
        $root.append($(kfPaginationItemHtml).data("id", total).text("去末页"));
        }
}

// 在线选择模块
$(document).on("click", "#kf-shop-dialog .sticker-item", function(e) {
    // select
    let selctedid=$(e.target).parents(".sticker-item").data("id"),selctedtext=JSON.parse($(e.target).parents(".sticker-item").data("content"));
    localStorage.onlineraws?OnlineRawslists=JSON.parse(localStorage.onlineraws):OnlineRawslists=[];
    OnlineRawslists==[]?olhaved=false:olhaved=OnlineRawslists.some(o => o.id === selctedid);
    if(olhaved==false){
        if(confirm("是否选择启用ID为"+ $(e.target).parents(".sticker-item").data("id")+"的在线表情贴纸"+$(e.target).parents(".sticker-item").text())){
            customize.olimglists.push(selctedid);
            OnlineRawslists.push(selctedtext);
            localStorage.setItem('onlineraws',JSON.stringify(OnlineRawslists))
            localStorage.setItem('StickerConf',JSON.stringify(customize))
            sessionStorage.removeItem('OnlineSmile')
        }else{alert("启用操作取消")}
    }
    else if(olhaved==true){
        if(confirm("是否选择停用ID为"+ $(e.target).parents(".sticker-item").data("id")+"的在线表情贴纸"+$(e.target).parents(".sticker-item").text())){
            const indexToRemove = OnlineRawslists.findIndex((orl) => orl.id === selctedid);OnlineRawslists.splice(indexToRemove, 1);
            customize.olimglists.splice(customize.olimglists.indexOf(selctedid),1);
            localStorage.setItem('onlineraws',JSON.stringify(OnlineRawslists))
            localStorage.setItem('StickerConf',JSON.stringify(customize))
            sessionStorage.removeItem('OnlineSmile')
        }else{alert("停用操作取消")}
    }




}).on("click", "#kf-shop-dialog .kf-pagination-item-button", function(e) {
    $(document).find('.kfe-shop_box').hide();
    let $dialog = $("#kf-shop-dialog")[0];
    $("body").append(kfDialogHtml);
    kfLoadSticker($(e.target).data("id"));
}).on("click", "#kf-shop-dialog .kf-pagination-prev-next", function(e) {
    $(document).find('.kfe-shop_box').hide();
    let $dialog = $("#kf-shop-dialog")[0];
    $("body").append(kfDialogHtml);
    kfLoadSticker($(e.target).data("id"));
}).on('click', '.kfe-close-shop', function (e) {
     $(document).find('.kfe-shop_box').hide();
});



/**
 * 添加CSS
 */
const appendCss = function () {

    $('head').append(`
<style>
  .kfe-container { padding: 5px; vertical-align: middle; font: 12px/1.7em "sans-serif"; }
  .kfe-menu { margin-bottom: 5px; }
  .kfe-sub-menu { margin: 0 5px; text-decoration: none; border-bottom: 2px solid transparent; }
  .kfe-sub-menu:hover, .kfe-sub-menu:focus { text-decoration: none; border-color: deeppink; }
  a.kfe-sub-menu-active { color: black }
  .kfe-smile-panel { display: none; height: 136px; padding: 5px 3px; overflow-y: auto; border-top: 1px solid #ddd; }
  .kfe-smile-panel[data-key="Shortcut"] { height: auto; }
  .kfe-smile { display: inline-block; max-width: 60px; max-height: 60px; cursor: pointer; }
  .kfe-smile-text { display: inline-block; padding: 3px 5px; }
  .kfe-smile-text:hover { color: #fff !important; background-color: #2b2b2b; text-decoration: none; }
  .kfe-close-panel { cursor: pointer; }
  .kfe-zoom-in {
    position: absolute; max-width: 150px; max-height: 150px; background-color: #fcfcfc; border: 3px solid rgba(242, 242, 242, 0.6);
    border-radius: 2px; box-shadow: 0 0 3px rgb(102, 102, 102);
  }</style>`);
    if(isKfMobile==false){
        $('head').append(`
<style>
  .kfe-shop_box {
    position: fixed;display: none; z-index: 1002;
    -webkit-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5); -moz-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5); box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);max-width: 1000px;
    left:0 !important;right:0 !important;margin:auto;
  }
  .kfe-shop_box sheader {height: 42px;background: rgb(49, 49, 49);display: block;font-size: 100%;margin: 0px;padding: 0px;color: rgb(115, 115, 115);font-family: "Helvetica Neue", Helvetica, arial, sans-serif;line-height: 1.231;}
  .kfe-shop_box sheader logo{float: left;margin: 25px 2px 0px 30px;font-size: 150%;padding: 0px;display: block;margin-block-start: 0.67em;margin-block-end: 0.67em;margin-inline-start: 0px;margin-inline-end: 0px;color:#fff;}
  .kfe-shop_box sheader span { float: right; margin: 25px 2px 0px 30px;font-size: 150%;padding: 0px;display: block;margin-block-start: 0.67em;margin-block-end: 0.67em;margin-inline-start: 0px;margin-inline-end: 0px;color:#fff;}
  .kfe-shop_nav { text-align: right; margin-top: 5px; margin-bottom: -5px; }
  .kfe-shop_main { background-color: #fcfcfc; padding: 0 10px; font-size: 12px; line-height: 24px; height: 450px;}
  .kfe-shop_main fieldset { border: 1px solid #ccccff; padding: 0 6px 6px; }
  .kfe-shop_main legend { font-weight: bold; }
  .kf-list-content {display: block;margin-block-start: 0em;margin-block-end: 1em;margin-inline-start: 0px;margin-inline-end: 0px;padding-inline-start: 40px;list-style-type: disc;line-height: 20px;background-color: #fcfcfc}
  .sticker-item {    display: inline-block;margin: 0 60px 26px 0;vertical-align: top;width: 128px;}
  .sticker-item-img {text-align: center;}
  .sticker-item-name {    color: #737373;font-size: 12px;line-height: 1.2;max-height: 38.2px;text-align: center;word-break: break-word;-webkit-line-clamp: 2;-webkit-box-orient: vertical;display: -webkit-box;overflow: hidden;width: 120px}
  .kfe-shop_main input[type="color"] { height: 18px; width: 30px; padding: 0; }
  .kfe-shop_tips { color: #51d; text-decoration: none; cursor: help; }
  .kfe-shop_tips:hover { color: #ff0000; }
  #pdConfigDialog .kfe-shop_main { overflow-x: hidden; white-space: nowrap; }
  .kfe-shop_panel { display: inline-block; width: 400px; vertical-align: top; }
  .kfe-shop_panel + .kfe-shop_panel { margin-left: 5px; }
  .kfe-shop_btns { background-color: #fcfcfc; text-align: right; padding: 5px; }
  .kfe-shop_btns input, .kfe-shop_btns button { vertical-align: middle; }
  .kfe-shop_btns button { min-width: 64px; }
  .kf-pagination-item-button {border-style: none;display: inline-block; text-align: center; margin: 5px;}
  .kf-pagination-nowpage-button {    border: 1px solid #e5e5e5;color: #00b84f;min-width: 30px;display: inline-block; text-align: center; margin: 5px;}
  .kf-pagination-prev-next {border-style: none;display: inline-block; text-align: center; margin: 5px;}
  .sticker-pages {background-color: #fcfcfc;padding: 8px 0 6px 10px;position: relative;color: #707072;font-size: 10px;margin: 0;text-align: center;display: inline-block;width: 100%; }
  .kfe-shop_footer {background-color: #f7f7fc;border-top: 1px solid #e6e6e6;padding: 8px 0 6px 10px;position: relative;color: #707072;font-size: 10px;margin: 0;}
  .kfe-shop_footer a{color: #707072;font-size: 10px;}
  .pd_custom_script_header { margin: 7px 0; padding: 5px; background-color: #e8e8e8; border-radius: 5px; }
  .pd_custom_script_content { display: none; width: 750px; height: 350px; white-space: pre; }
</style>
`);}
    else if(isKfMobile==true){
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
    let $textAreas = $("textarea");
    if (!$textAreas.length) return;
    appendCss();
    $textAreas.each(function () {
        createContainer(this);
    });
};
if(localStorage.StickerConf==null){
    alert('首次使用，部署默认设置。您可以在【自定义】->【个性设置】中完成个性化设置！');
    localStorage.setItem('StickerConf',JSON.stringify({"kanbanimg":"https://sticker.inari.site/truenight.gif","kanbansize":"64","onlineraw":"https://api.inari.site/?s=App.Sticker.","notauthed":false,"UseOldNum":false,"lcimglists":false,"olimglists":[]}));
};
if(customize.lcimglists==false){
    alert('当前表情贴纸组为默认设置，您可以在【表情组设置->启用的本地表情组/表情组商店】中选择要启用的表情组！');
    localStorage.setItem('StickerConf',JSON.stringify({"kanbanimg":"https://sticker.inari.site/truenight.gif","kanbansize":"64","onlineraw":"https://api.inari.site/?s=App.Sticker.","notauthed":false,"UseOldNum":false,"lcimglists":[0,1,2,3,4,5,6,7,8,9],"olimglists":[]}));
};
init();
