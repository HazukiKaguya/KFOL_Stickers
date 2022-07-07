// ==UserScript==
// @name        绯月表情增强插件*改
// @namespace   https://github.com/HazukiKaguya/KFOL_Stickers
// @version     1.3.9
// @author      eddie32&喵拉布丁&HazukiKaguya
// @description KF论坛专用的回复表情，插图扩展插件，在发帖时快速输入自定义表情和论坛BBCODE
// @icon        https://sticker.inari.site/favicon.ico
// @homepage    https://mistakey.top/KFStickers
// @include     https://*kforz.com/*
// @include     https://*kfmax.com/*
// @include     https://*9shenmi.com/*
// @include     https://*kfpromax.com/*
// @include     http*://*kfgal.com/*
// @include     https://*kfmax.com/*
// @include     https://*bakabbs.com/*
// @include     https://*365gal.com/*
// @include     https://*365galgame.com/*
// @include     https://kfol.moe.edu.rs/*
// @include     https://*miaola.*
// @copyright   2014-2019, eddie32 ; 2020-2022, Hazukikaguya
// @grant       none
// @license     MIT
// @run-at      document-end
// @updateURL   https://github.com/HazukiKaguya/KFOL_Stickers/raw/master/es6_KfStickers.user.js
// ==/UserScript==
//eddie32大佬的KFOL助手的表情插件的分支，目前基于5.1.3版本的喵拉分支 @copyright   2014-2019, eddie32 https://greasyfork.org/scripts/5124 https://github.com/liu599
/*
本次更新日志：
1.3.9 表情贴纸组数据源分离，大量操作逻辑重写。请注意，这是一个1.4.0版本的前置更新
历史更新记录：
https://github.com/HazukiKaguya/KFOL_Stickers/blob/master/changelog.txt
*/
'use strict';
// 版本号
const version = '1.3.9';
// 使用旧式?num=而不是新式的#num= 改为true启用
const UseOldNum = false;
// 看板娘图片自定义
const kanbanmsume = "/ys/in/read_75675456.gif";
// 看板娘大小/粘贴预览图大小自定义,支持%或px/em
const previewsize = "64%";
// 网站是否为KfMobile
const isKfMobile = typeof Info !== 'undefined' && typeof Info.imgPath !== 'undefined';
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
 if(p.src.match(/https:\/\/sticker.inari.site/)){
  i.parentElement.replaceChild(p,i);}
 else if(p.src.match(/http:\/\/tb2.bdstatic.com\/tb\/editor\/images\/face/)){
  i.parentElement.replaceChild(p,i);}}})
// 文本区域粘贴图片预览区
function imgurl() {
let imgpreview = document.createElement("div");if(isKfMobile==true){
      imgpreview.innerHTML = '<div id = "imgpreview" style = "position:fixed;left:5px;top:100px;z-index:88;cursor:pointer;" ><img class="imgpreview" src = "https://sticker.inari.site/favicon.ico" width = '+previewsize+' height = '+previewsize+' ></div>';
}else{if(localStorage.imgpvpc!=null){let imgpvpc=localStorage.imgpvpc;let imgpvpcpush = JSON.parse(imgpvpc);
      imgpreview.innerHTML = '<div id = "imgpreview" style = "position:fixed;left:'+imgpvpcpush[0]+';top:'+imgpvpcpush[1]+';z-index:88;cursor:pointer;" ><img class="imgpreview" src = '+kanbanmsume+' width = '+previewsize+' height = '+previewsize+' ></div>';
}else{imgpreview.innerHTML = '<div id = "imgpreview" style = "position:fixed;left:5px;top:40px;z-index:88;cursor:pointer;" ><img class="imgpreview" src = '+kanbanmsume+' width = '+previewsize+' height = '+previewsize+' ></div>';
}}document.body.appendChild(imgpreview);}imgurl();
// 可拖拽看板娘,会记录拖拽位置
let imgpv = document.getElementById("imgpreview");
window.onload = function(){ drag(imgpv);};
function drag(obj){
obj.onmousedown = function(event){
  obj.setCapture && obj.setCapture();
  event = event ||window.event
  let cleft=obj.style.left;
  let ctop=obj.style.top;
  let ol = event.clientX - obj.offsetLeft;
  let ot = event.clientY - obj.offsetTop;
  document.onmousemove = function(event){
    event = event ||window.event
    let left = event.clientX-ol;
    let top = event.clientY-ot;
    obj.style.left = left+"px";
    obj.style.top = top+"px";};
  document.onmouseup = function(){
    document.onmousemove = null;
    document.onmouseup = null;
    obj.releaseCapture && obj.releaseCapture();
    let vleft=obj.style.left;
    let vtop=obj.style.top;
    if(cleft==vleft&&vtop==ctop){
      $('.kfe-user-p').click();}
    else{let imgpvpcpull =[vleft,vtop];
     localStorage.setItem('imgpvpc',JSON.stringify(imgpvpcpull));
};};return false;};};
// 测试数据源标准化格式
let OldSmile=[
    {"id":1,"desc":"AC娘表情贴纸，属于AcSmileList，AC娘。","cover":"https://sticker.inari.site/acfun/1/1.png","name":"_Acfun","title":'AC娘',"addr":"_AcSmileList","numstart":1,"numend":55,"url1":"https://sticker.inari.site/acfun/1/","url2":".png"},
    {"id":2,"desc":"AC娘表情贴纸，属于AcSmileList，AC娘。","cover":"https://sticker.inari.site/acfun/2/1001.png","name":"_Acfun","title":'AC娘',"addr":"_AcSmileList","numstart":1001,"numend":1041,"url1":"https://sticker.inari.site/acfun/2/","url2":".png"},
    {"id":3,"desc":"AC娘表情贴纸，属于AcSmileList，AC娘。","cover":"https://sticker.inari.site/acfun/3/2001.png","name":"_Acfun","title":'AC娘',"addr":"_AcSmileList","numstart":2001,"numend":2056,"url1":"https://sticker.inari.site/acfun/3/","url2":".png"},
    {"id":4,"desc":"华语第三动漫高手论坛S1的麻将脸表情包喵~","cover":"https://sticker.inari.site/s1/1.gif","name":"_S1","title":'S1',"addr":"_S1SmileList","numstart":1,"numend":21,"url1":"https://sticker.inari.site/s1/","url2":".gif"},
    {"id":5,"desc":"华语第三动漫高手论坛S1的麻将脸表情包喵~","cover":"https://sticker.inari.site/s1/1.png","name":"_S1","title":'S1',"addr":"_S1SmileList","numstart":1,"numend":229,"url1":"https://sticker.inari.site/s1/","url2":".png"},
    {"id":6,"desc":"《摇曳百合》的阿卡林的表情包~","cover":"https://sticker.inari.site/akarin/2/akarin (1).gif","name":"_Akarin","title":'阿卡林',"addr":"_AkarinSmileList","numstart":1,"numend":21,"url1":"https://sticker.inari.site/akarin/2/akarin (","url2":").gif"},
    {"id":7,"desc":"《摇曳百合》的阿卡林的表情包~","cover":"https://sticker.inari.site/akarin/1/akarin (1).png","name":"_Akarin","title":'阿卡林',"addr":"_AkarinSmileList","numstart":1,"numend":72,"url1":"https://sticker.inari.site/akarin/1/akarin (","url2":").png"},
    {"id":8,"desc":"小B是画师林大B练习用的看板娘，最初是在sosg论坛上出现~","cover":"https://sticker.inari.site/lindaB/lindaB (1).jpg","name":"_xiaoB","title":'小B',"addr":"_xiaoBSmileList","numstart":1,"numend":52,"url1":"https://sticker.inari.site/lindaB/lindaB (","url2":").jpg"},
    {"id":9, "desc":"微博贴吧表情包","cover":"https://sticker.inari.site/weibo/1.png","name":"_Weitb","title":'微博贴吧',"addr":"_WeitbSmileList","numstart":1,"numend":101,"url1":"https://sticker.inari.site/weibo/","url2":".png"},
    {"id":10,"desc":"微博贴吧表情包","cover":"https://sticker.inari.site/weibo/1.png","name":"_Weitb","title":'微博贴吧',"addr":"_WeitbSmileList","numstart":1,"numend":10,"url1":"https://tb2.bdstatic.com/tb/editor/images/face/i_f0","url2":".png"},
    {"id":11,"desc":"微博贴吧表情包","cover":"https://sticker.inari.site/weibo/1.png","name":"_Weitb","title":'微博贴吧',"addr":"_WeitbSmileList","numstart":10,"numend":34,"url1":"https://tb2.bdstatic.com/tb/editor/images/face/i_f","url2":".png"},
    {"id":12,"desc":"微博贴吧表情包","cover":"https://sticker.inari.site/weibo/1.png","name":"_Weitb","title":'微博贴吧',"addr":"_WeitbSmileList","numstart":10,"numend":34,"url1":"https://tb2.bdstatic.com/tb/editor/images/face/i_f","url2":".png"},
    {"id":11,"desc":"暹罗猫小红豆，世界，就是绕着猫打转！","cover":"https://sticker.inari.site/usr/Kawaii_Siamese/wx1/0_show.png","name":"_Siamese","title":'小红豆',"addr":"_SiameseSmileList","numstart":1,"numend":25,"url1":"https://sticker.inari.site/usr/Kawaii_Siamese/wx1/","url2":".png"},
    {"id":12,"desc":"暹罗猫小红豆，世界，就是绕着猫打转！","cover":"https://sticker.inari.site/usr/Kawaii_Siamese/wx2/0_show.png","name":"_Siamese","title":'小红豆',"addr":"_SiameseSmileList","numstart":1,"numend":25,"url1":"https://sticker.inari.site/usr/Kawaii_Siamese/wx2/","url2":".png"},
	   {"id":13,"desc":"暹罗猫小红豆，世界，就是绕着猫打转！","cover":"https://sticker.inari.site/usr/Kawaii_Siamese/line/0_show.png","name":"_Siamese","title":'小红豆',"addr":"_SiameseSmileList","numstart":1,"numend":41,"url1":"https://sticker.inari.site/usr/Kawaii_Siamese/line/","url2":".png"},
    {"id":14,"desc":"Lovelive表情贴纸~","cover":"https://sticker.inari.site/lovelive/2/ll (1).png","name":"_LL","title":'LL',"addr":"_LLSmileList","numstart":1,"numend":42,"url1":"https://sticker.inari.site/lovelive/2/ll (","url2":").png"},
	   {"id":15,"desc":"Lovelive表情贴纸~","cover":"https://sticker.inari.site/lovelive/4/ll (1).jpg","name":"_LL","title":'LL',"addr":"_LLSmileList","numstart":1,"numend":20,"url1":"https://sticker.inari.site/lovelive/4/ll (","url2":").jpg"},
   	{"id":16,"desc":"少女☆歌剧。去吧，两人一起，摘下那颗星。","cover":"https://sticker.inari.site/revstar/revstar (1).png","name":"_Revue","title":'少歌',"addr":"_RevueSmileList","numstart":1,"numend":41,"url1":"https://sticker.inari.site/revstar/revstar (","url2":").png"},
   	{"id":17,"desc":"公主连结Re:Dive。いま、新たな冒険の幕が上がる——","cover":"https://sticker.inari.site/redive/sticker (1).png","name":"_Redive","title":'PCR',"addr":"_RediveSmileList","numstart":1,"numend":49,"url1":"https://sticker.inari.site/redive/sticker (","url2":").png"},
    {"id":18,"desc":"BanG Dream！噜~ キラキラ☆ドキドキ~ ふえぇ~","cover":"https://sticker.inari.site/bangdream/bangdream (1).png","name":"_Bandori","title":'邦邦',"addr":"_BandoriSmileList","numstart":1,"numend":41,"url1":"https://sticker.inari.site/bangdream/bangdream (","url2":").png"},
    {"id":19,"desc":"仲野爱（Nakano Mei），是出自シロガネ×スピリッツ(亢奋的少女格斗)戏画GIGA公司的Galgame人物之一 ，元气可爱的一年生。属于NakanoMei,仲野爱","cover":"https://sticker.inari.site/usr/NakanoMei/1.png","name":"_NakanoMei","title":'仲野爱',"addr":'_NakanoMeiList',"numstart":1,"numend":22,"url1":"https://sticker.inari.site/usr/NakanoMei/","url2":".png"}
]
// 处理来自数据源的表情贴纸
function trans (arr) {
  let obj = {};
  let result = [];
  arr.forEach(({name,title,desc, value}) => {
    let cur = obj[name];
    if (cur) {
      let index = cur.index;
      result[index].value +=','+value;
      result[index].value=result[index].value.split(',');
    } else {
      let index = result.length;
      obj[name] = {
        name,
        title,
        desc,
        index
      }
      result.push({name,title,desc, value});
    }
  })
  return result
}


// 灰企鹅
const KfSmileList = [];
const KfSmileCodeList = [];
let kfImgPath = typeof imgpath !== 'undefined' ? imgpath : '';
if (isKfMobile) kfImgPath = Info.imgPath;
for (let i = 1; i < 49; i++) {
    KfSmileList.push(`/${kfImgPath}/post/smile/em/em${(i) > 9 ? i : ('0' + i)}.gif`);
    KfSmileCodeList.push(`[s:${i + 9}]`);
}
// 备用
for (let i = 0; i < 204; i++) {
    KfSmileList.push(`https://sticker.inari.site/pesoguin/${i}.gif`);
    KfSmileCodeList.push(`[img]https://sticker.inari.site/pesoguin/${i}.gif[/img]`);
}

// 随机
const RandomSmileList = [];
    RandomSmileList.push(`https://sticker.inari.site/yukika/${Math.ceil(Math.random()*6)}.jpg`);
for (let i = 0; i < 29; i++) {
    RandomSmileList.push(`https://sticker.inari.site/rwebp/${Math.ceil(Math.random()*6930)}.webp`);
}
for (let i = 1; i < 10; i++) {
    RandomSmileList.push(`https://sticker.inari.site/rgif/${Math.ceil(Math.random()*2555)}.gif`);
}


// 自定义
let userimgst=localStorage.userimgst;
userimgst==undefined?userimgst=`["https://sticker.inari.site/null.jpg"]`:userimgst=localStorage.userimgst;
const UserSmileList = JSON.parse(userimgst);
const UsersSmileList = [];
if (UseOldNum == true){
for (let i = 0; i < UserSmileList.length; i++){
    UsersSmileList.push(`${UserSmileList[i]}?num=${i+1}`);
}}
else {for (let i = 0; i < UserSmileList.length; i++){
    UsersSmileList.push(`${UserSmileList[i]}#num=${i+1}`);
}}

//来自数据源的表情贴纸
let locAuth=sessionStorage.localSmile;
if(locAuth==null){
const LocaSmile=[];
for(let s=0; s<OldSmile.length; s++){
    const Smilelist=[];
	for (let i = OldSmile[s].numstart; i < OldSmile[s].numend ; i++) {
        Smilelist.push(OldSmile[s].url1+i+OldSmile[s].url2);
	}
    LocaSmile[s]={name:OldSmile[s].name,title:OldSmile[s].title,desc:OldSmile[s].desc,value:Smilelist};
}
let localSmile=trans(LocaSmile);
sessionStorage.setItem('localSmile', JSON.stringify(localSmile));
}
let localSmile=JSON.parse(sessionStorage.localSmile)


/**
 * 表情菜单
 */
const MenuList = {
    KfSmile: {datatype: 'imageLink', title: 'KF',desc: 'KF自带的小企鹅', addr: KfSmileList, ref: KfSmileCodeList},
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
    Userimg:  {datatype: 'image', title: '自定义', desc:'你自己新增的表情贴纸都在这里！', addr: UsersSmileList},
    Random:   {datatype: 'image', title: '随机', desc:'从随机表情贴纸池里随机抽取表情贴纸！', addr: RandomSmileList},
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
// Menu来自数据源的表情贴纸组
for(let s=0; s<localSmile.length; s++){
    MenuList[`${localSmile[s].name}`]={datatype: 'image', title: localSmile[s].title ,desc:localSmile[s].desc, addr: localSmile[s].value};
}

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
    <input type="button" class="kfe-user-g" value="表情设置">&nbsp;
    <span class="kfe-close-panel" title="版本${version}; 本分支由mistakey维护，是eddie32插件喵拉布丁分支的分支" style="cursor: pointer;"><b>⑨</b></span>
    ${getSubMenuHtml()}
    <span class="kfe-close-panel">[-]</span>&nbsp;
    <div class="kfe-diy-panel" style="display:none">
    <input type="button" class="kfe-user-c" value="添加贴纸">&nbsp;
    <input type="button" class="kfe-user-r" value="导出贴纸">&nbsp;
    <input type="button" class="kfe-user-u" value="修改贴纸">&nbsp;
    <input type="button" class="kfe-user-d" value="删除贴纸">&nbsp;
    <input type="button" class="kfe-user-s" value="个性设置"></div>
    <div class="kfe-acc-panel" style="display:none">
    <input type="button" class="kfe-user-log" value="登录账号">&nbsp;
    <input type="button" class="kfe-user-reg" value="注册账号">&nbsp;
    <input type="button" class="kfe-user-img" value="绑定图床">&nbsp;
    <input type="button" class="kfe-user-ltc" value="上传云端">&nbsp;
    <input type="button" class="kfe-user-ctl" value="恢复本地">
    </div></div></div>`).insertBefore($(textArea));
    if(isKfMobile==true){
    $(`<button class="btn btn-secondary upload-image-btn ml-1" title="上传图片" onclick="$('.kfe-user-p').click();">
      <i class="fa fa-picture-o" aria-hidden="true"></i>上传图片</button>`).insertAfter($("#smileDropdownBtn"));
    }
    else{
        $(`<a>&nbsp;</a><input type="button" class="kfe-user-t" value="上传图片" onclick="$('.kfe-user-p').click();">`).insertAfter($(":submit"));
    }
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
                          localStorage.removeItem('alertdata');
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
    }).on('click', '.kfe-user-i', function (e) {
        e.preventDefault();
        $container.find('.kfe-acc-panel').hide();
        let $this = $(this);
        $container.find('.kfe-user-i').removeClass('kfe-user-i-active');
        $this.addClass('kfe-user-i-active');
        $container.find('.kfe-diy-panel').hide();
        let $panel = $container.find(`.kfe-diy-panel`);
        $panel.show();
        let $panels = $container.find(`.kfe-smile-panel[data-key="userimg"]`);
        $panels.show();
    }).on('click', '.kfe-user-y', function (e) {
        e.preventDefault();
        $container.find('.kfe-smile-panel').hide();
        $container.find('.kfe-diy-panel').hide();
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
        }
        if (addList.length < userimgcmt.length){
            alert('含有非法输入，请检查是否有图片url错误');
        }
        if (addList.length > 0) {let userSmileList = [];
            if (localStorage.userimgst) {
                try {userSmileList = JSON.parse(localStorage.userimgst);}
                catch (ex) {console.log(ex);userSmileList = [];}}
            userSmileList = [...userSmileList, ...addList];
            localStorage.setItem('userimgst', JSON.stringify(userSmileList));
            alert('贴纸已添加');
            location.reload();
        }
    }).on('click', '.kfe-user-r', function (e) {
        e.preventDefault();
        if (UserSmileList !="https://sticker.inari.site/null.jpg"){
           prompt("自定义表情贴纸已导出，请复制",UserSmileList);
        }
        else {
           alert("自定义表情贴纸为空！");
        }
    }).on('click', '.kfe-user-u', function (e) {
         e.preventDefault();
         let userimgu = prompt("请输入要替换的贴纸的序号", "1");
         if (/[0-9]$/i.test(userimgu)) {
            let userimgst = localStorage.userimgst;
            let UserSmileList = JSON.parse(userimgst);
            if (userimgu > UserSmileList.length) {
                alert('序号超出贴纸数，请检查');
              }
            else if (userimgu == 0) {
                 alert('非法输入，请检查！');
              }
            else if (userimgu <= UserSmileList.length) {
                let usreplace = prompt("请输入用于替换的图片url", "https://sticker.inari.site/inari.png");
                let j = userimgu;
                    if (/(http:\/\/|https:\/\/).*.(png|jpg|jpeg|gif|webp|bmp|tif)+.*$/i.test(usreplace)) {
                       if (confirm('确定替换序号为'+userimgu+'的贴纸吗？这是最后一次确认！')) {
                           UserSmileList[j - 1] = usreplace;
                           localStorage.setItem('userimgst', JSON.stringify(UserSmileList));
                           alert('已替换指定序号的贴纸');
                           location.reload();
                       }
                    }
            else if (usreplace == null) { }
            else if (usreplace == 0) {
                  alert('非法输入，请检查！');
            }
            else {
                  alert('非法输入，请检查！');
            }
         }
         else if (userimgu == null) { }
         else {
              alert('非法输入，请检查！');
         }
        }
    }).on('click', '.kfe-user-d', function (e) {
        e.preventDefault();
        if (confirm('确定删除自定义表情贴纸吗？')) {
          if (confirm('【确定】清空自定义贴纸，【取消】删除指定贴纸。')) {
              if (confirm('确定【清空自定义贴纸】吗？这是【最后一次】确认')) {
                  localStorage.removeItem('userimgst');
                  alert('已清空自定义贴纸');
                  location.reload();
              }
          }
          else {
              let userimgd = prompt("请输入要删除的贴纸的序号", "1");
              if (/[0-9]$/i.test(userimgd)) {
               let userimgst = localStorage.userimgst;
               let UserSmileList = JSON.parse(userimgst);
               if (userimgd > UserSmileList.length) {
                alert('序号超出贴纸数，请检查');
               }
               else if (userimgd == 0) {
                 alert('非法输入，请检查！');
               }
               else if (userimgd <= UserSmileList.length) {
                 if (confirm('确定删除【序号为'+userimgd+'的贴纸】吗？这是【最后一次】确认！')) {
                   for (let i = userimgd; i <= UserSmileList.length; i++) {
                        UserSmileList[i - 1] = UserSmileList[i];
                    }
                     UserSmileList.pop();
                     localStorage.setItem('userimgst', JSON.stringify(UserSmileList));
                     alert('已删除指定序号的贴纸！');
                     location.reload();
                 }
                }
                else {
                        alert('非法输入，请检查！');
                }
             }
             else if (userimgd == null) { }
             else {
                alert('非法输入，请检查！');
             }
          }
        }
    }).on('click', '.kfe-user-ctl', function (e) {
        e.preventDefault();
        if (localStorage.logindata!=null){
            let tokendata = localStorage.logindata;
            let tokenList = JSON.parse(tokendata);
            let syncid=tokenList[0];
            let synctoken=tokenList[1];
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
                    let dljson = dlRequest.responseText;
                    let download=JSON.parse(dljson);
                    if (download.ret==200){
                        if (confirm('确定同步【云端数据到本地】吗？这是最后一次确认！')) {
                            let dldata=download.data;
                            let dlpicsList=dldata.picsdata;
                            if (dlpicsList !=""){
                                let UserSmileList = dlpicsList.split(',');
                                localStorage.setItem('userimgst',JSON.stringify(UserSmileList));
                                alert("已同步云端数据到本地！");
                                location.reload();
                            }
                            else{
                                alert("云端数据为空！同步到本地操作已取消！");
                            }
                        }
                    }
                    else{
                        alert('Token已失效，请重新登录！');
                    }
                }
                else if(dlRequest.readyState == 4 && dlRequest.status != 200){
                    alert('发生错误！错误状态码：'+dlRequest.status)
                }
            }
        }
        else{
            alert('未找到有效Token，请先登录！');
        }
    }).on('click', '.kfe-user-ltc', function (e) {
        e.preventDefault();
        if (localStorage.logindata!=null){
            let tokendata = localStorage.logindata;
            let tokenList = JSON.parse(tokendata);
            let syncid=tokenList[0];
            let synctoken=tokenList[1];
            if (confirm('确定同步【本地数据到云端】吗？这是最后一次确认！')) {
                let userimgst = localStorage.userimgst;
                if (userimgst !=null){
                    let UserSmileList = JSON.parse(userimgst);
                    let upRequest = new XMLHttpRequest();
                    upRequest.open('POST', 'https://api.inari.site/?s=App.User_User.picsupdate&user_id='+syncid+'&token='+synctoken+'&picsdata='+UserSmileList, true);
                    upRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                    upRequest.send('name=teswe&ee=ef');
                    upRequest.onreadystatechange = function () {
                        if (upRequest.readyState == 4 && upRequest.status == 200) {
                            let upjson = upRequest.responseText;
                            let upload=JSON.parse(upjson);
                            if (upload.ret==200){
                                alert("已同步本地数据到云端！");
                            }
                            else{
                                alert('Token已失效，请重新登录！');
                            }
                        }
                        else if(upRequest.readyState == 4 && upRequest.status != 200){
                            alert('发生错误！错误状态码：'+upRequest.status);
                        }
                    }
                }
                else{
                        alert('本地数据为空！同步到云端操作已取消！');
                    }
            }
        }
        else{
            alert('未找到有效Token，请先登录！');
        }
    }).on('click', '.kfe-user-log', function (e) {
        e.preventDefault();
        let username = prompt("用户名",'username');
        if (username.length>=1&&username.length<=50){
            let password = prompt("密码",'password');
            if (password.length>=6&&password.length<=20){
                let loginRequest = new XMLHttpRequest();
                loginRequest.open('POST', 'https://api.inari.site/?s=App.User_User.Login&username='+username+'&password='+password, true);
                loginRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                loginRequest.send('name=teswe&ee=ef');
                loginRequest.onreadystatechange = function () {
                    if (loginRequest.readyState == 4 && loginRequest.status == 200) {
                        let loginjson = loginRequest.responseText;
                        let login=JSON.parse(loginjson);
                        if (login.ret==200){
                            let logindata=login.data;
                            if (logindata.is_login==true){
                                localStorage.removeItem('logindata');
                                let logindarray=[logindata.user_id,logindata.token];
                                localStorage.setItem('logindata',JSON.stringify(logindarray));
                                // 检测绑定图床Token信息的方法
                                let getokenRequest = new XMLHttpRequest();
                                getokenRequest.open('POST', 'https://api.inari.site/?s=App.User_User.Tutoken&user_id='+logindata.user_id+'&token='+logindata.token, true);
                                getokenRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                                getokenRequest.send('name=teswe&ee=ef');
                                getokenRequest.onreadystatechange = function () {
                                    if (getokenRequest.readyState == 4 && getokenRequest.status == 200) {
                                        let getokentext = getokenRequest.responseText;
                                        let getokenjson=JSON.parse(getokentext);
                                        if (getokenjson.ret==200){
                                            let tkdata=getokenjson.data;
                                            let gtoken=tkdata.tutoken;
                                            if (gtoken !=""){
                                                localStorage.removeItem('logindata');
                                                let gtokenarray=[logindata.user_id,logindata.token,gtoken];
                                                localStorage.setItem('logindata',JSON.stringify(gtokenarray));
                                                alert('你可以进行同步操作了！');
                                            }
                                            else{
                                                alert('检测到没有绑定图床账号，请前往【绑定图床】进行绑定！否则，上传图片将使用游客上传！')
                                            }
                                        }
                                        else{
                                            alert('你依然可以进行同步操作。检测是否绑定图床账号失败！返回码：'+getokenjson.ret);
                                        }
                                    }
                                    else if(getokenRequest.readyState == 4 && getokenRequest.status != 200){
                                        alert('你依然可以进行同步操作。检测是否绑定图床账号失败！异常的请求！状态码：'+getokenRequest.status);
                                    }
                                }
                            }
                            else if(logindata.is_login==false){
                                alert('Oops！用户名或密码错误！请检查！');
                            }
                        }
                        else if (login.ret==400) {
                            alert('Oops！该账号还没有注册，请注册！');
                        }
                        else{
                            alert('Oops！异常的错误！返回码：'+login.ret);
                        }
                    }
                }
            }
            else{
                alert('密码长度不合规，密码位数应在6-20位范围');
            }
        }
        else {
            alert('用户名长度不合规，用户名位数应在1-50位范围');
        }
    }).on('click', '.kfe-user-img', function (e) {
        e.preventDefault();
        let tokendata = localStorage.logindata;
        let tokenList = JSON.parse(tokendata);
        let syncid=tokenList[0];
        let synctoken=tokenList[1];
        // 检测绑定图床Token信息的方法
        let getokenRequest = new XMLHttpRequest();
        getokenRequest.open('POST', 'https://api.inari.site/?s=App.User_User.Tutoken&user_id='+syncid+'&token='+synctoken, true);
        getokenRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        getokenRequest.send('name=teswe&ee=ef');
        getokenRequest.onreadystatechange = function () {
            if (getokenRequest.readyState == 4 && getokenRequest.status == 200) {
                let getokentext = getokenRequest.responseText;
                let getokenjson=JSON.parse(getokentext);
                if (getokenjson.ret==200){
                    let tkdata=getokenjson.data;
                    let gtoken=tkdata.tutoken;
                    if (gtoken !=""){
                        localStorage.removeItem('logindata');
                        let gtokenarray=[syncid,synctoken,gtoken];
                        localStorage.setItem('logindata',JSON.stringify(gtokenarray));
                        alert('检测到您已绑定图床账号！');
                    }
                    else{
                        let inariuser = prompt("inari图床账号邮箱",'example@example.mail');
                        let inaripass = prompt("inari图床账号密码",'password');
                        let formData = '{ "email":"'+inariuser+'" , "password":"'+inaripass+'" }';
                        $.ajax({
                            url: 'https://up.inari.site/api/v1/tokens',
                            type: 'POST',
                            dataType: 'json',
                            data:formData,
                            contentType:"application/json",
                            processData: false,
                        })
                            .done(data => {
                            if(data.status==true){
                                let tokendata= data.data;
                                let token=tokendata.token;
                                localStorage.removeItem('logindata');
                                let tokenarray=[syncid,synctoken,token];
                                localStorage.setItem('logindata',JSON.stringify(tokenarray));
                                let tokenRequest = new XMLHttpRequest();
                                tokenRequest.open('POST', 'https://api.inari.site/?s=App.User_User.tupdate&user_id='+syncid+'&token='+synctoken+'&tupdate='+token, true);
                                tokenRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                                tokenRequest.send('name=teswe&ee=ef');
                                tokenRequest.onreadystatechange = function () {
                                    if (tokenRequest.readyState == 4 && tokenRequest.status == 200) {
                                        let tokentext = tokenRequest.responseText;
                                        let tokenjson=JSON.parse(tokentext);
                                        if (tokenjson.ret==200){
                                            alert("已绑定图床账号！");
                                            return;
                                        }
                                        else{
                                            alert('图床账号绑定失败！异常请求返回码：'+tokenjson.ret);
                                        }
                                    }
                                    else if(tokenRequest.readyState == 4 && tokenRequest.status != 200){
                                        alert('图床账号绑定失败！异常请求状态码：'+tokenRequest.status);
                                    }
                                }
                            }
                            else if(data.status==false){
                                alert(data.message);
                            }
                        })
                            .fail(data => {
                            alert('Oops！图床账号绑定失败！可能是服务器错误或网络问题！');
                        });
                    }
                }
                else{
                    alert('检测是否绑定了图床账号失败！返回码：'+getokenjson.ret);
                }
            }
            else if(getokenRequest.readyState == 4 && getokenRequest.status != 200){
                alert('异常的请求！状态码：'+getokenRequest.status);
            }
        }
    }).on('click', '.kfe-user-reg', function (e) {
        e.preventDefault();
        let regname = prompt("用户名，1-50位，只支持英文、数字和有限的特殊符号如@_",'username');
        if (regname.length>=1&&regname.length<=20){
            let regpswd1 = prompt("输入6-20位密码，只支持英文、数字和有限的特殊符号如@_",'password');
            let regpswd2 = prompt("确认密码",'password');
            if (regpswd1.length>=6&&regpswd1.length<=20){
                if (regpswd1==regpswd2){
                    //调用注册api
                    let regRequest = new XMLHttpRequest();
                    regRequest.open('POST', 'https://api.inari.site/?s=App.User_User.Register&username='+regname+'&password='+regpswd2, true);
                    regRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                    regRequest.send('name=teswe&ee=ef');
                    regRequest.onreadystatechange = function () {
                        if (regRequest.readyState == 4 && regRequest.status == 200) {
                            let regjson = regRequest.responseText;
                            let reg=JSON.parse(regjson);
                            //注册成功
                            if (reg.ret==200){
                                //调用登录api
                                let loginRequest = new XMLHttpRequest();
                                loginRequest.open('POST', 'https://api.inari.site/?s=App.User_User.Login&username='+regname+'&password='+regpswd2, true);
                                loginRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                                loginRequest.send('name=teswe&ee=ef');
                                loginRequest.onreadystatechange = function () {
                                    if (loginRequest.status === 200 && loginRequest.readyState === 4) {
                                        let loginjson = loginRequest.responseText;
                                        let login=JSON.parse(loginjson);
                                        let logindata=login.data;
                                        //账号id与token储存
                                        localStorage.removeItem('logindata');
                                        let logindarray=[logindata.user_id,logindata.token];
                                        localStorage.setItem('logindata',JSON.stringify(logindarray));
                                        if(confirm('是否绑定up.inari.site图床账号？【确定】绑定【取消】则不绑定，上传图片将使用游客上传')){
                                            // 写获取token的方法
                                            let inariuser = prompt("inari图床账号邮箱",'example@example.com');
                                            let inaripass = prompt("inari图床账号密码",'password');
                                            let formData = '{ "email":"'+inariuser+'" , "password":"'+inaripass+'" }';
                                            $.ajax({
                                                url: 'https://up.inari.site/api/v1/tokens',
                                                type: 'POST',
                                                dataType: 'json',
                                                data:formData,
                                                contentType:"application/json",
                                                processData: false,
                                            })
                                                .done(data => {
                                                if(data.status==true){
                                                    let tokendata= data.data;
                                                    let token=tokendata.token;
                                                    localStorage.removeItem('logindata');
                                                    let tokenarray=[logindata.user_id,logindata.token,token];
                                                    localStorage.setItem('logindata',JSON.stringify(tokenarray));
                                                    let tokenRequest = new XMLHttpRequest();
                                                    tokenRequest.open('POST', 'https://api.inari.site/?s=App.User_User.tupdate&user_id='+logindata.user_id+'&token='+logindata.token+'&tupdate='+token, true);
                                                    tokenRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                                                    tokenRequest.send('name=teswe&ee=ef');
                                                    tokenRequest.onreadystatechange = function () {
                                                        if (tokenRequest.readyState == 4 && tokenRequest.status == 200) {
                                                            let tokentext = tokenRequest.responseText;
                                                            let tokenjson=JSON.parse(tokentext);
                                                            if (tokenjson.ret==200){
                                                                alert("已绑定图床Token，现在你可以进行同步操作了！");
                                                            }
                                                            else{
                                                                alert('你依然可以进行同步操作。图床账号绑定失败！异常请求返回码：'+tokenjson.ret);
                                                            }
                                                        }
                                                        else if(tokenRequest.readyState == 4 && tokenRequest.status != 200){
                                                            alert('你依然可以进行同步操作。图床账号绑定失败！异常请求状态码：'+tokenRequest.status);
                                                        };
                                                    }
                                                }
                                                else if(data.status==false){
                                                    alert(data.message);
                                                }
                                                return;
                                            })
                                                .fail(data => {
                                                alert('你依然可以进行同步操作。Oops！图床账号绑定失败！可能是服务器错误或网络问题！');
                                            });
                                            event.preventDefault();
                                        }
                                        else{
                                            alert("已自动登录，现在你可以进行同步操作了！");
                                        }
                                    }
                                }
                            }
                            //注册失败
                            else if (reg.ret!=200){
                                alert('Oops！'+reg.msg+'注册失败！返回码：'+reg.ret);
                            }
                        }
                        else if(regRequest.readyState == 4 && regRequest.status != 200){
                            alert('用户名或密码不合规，只支持英文、数字和有限的特殊符号如@_');
                        }
                    }
                }
                else{
                    alert("两次密码不一致，注册操作已取消！");
                }
            }
            else{
                alert("密码长度不合规，须在6-20位范围内，注册操作已取消！")
            }
        }
        else{
            alert("用户名长度不合规，须在1-50位范围内，注册操作已取消！");
        }
    }).on('click', '.kfe-user-g', function (e) {
        alert('数据源相关')
    }).on('change', '.kfe-user-p', function (e) {
        e.preventDefault();
        let formData = new FormData();
        let file = this.files[0];
        formData = new FormData();
        formData.append('file', file);
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
                          localStorage.removeItem('alertdata');
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
                    alert('图片上传失败，可能是网络原因。');
                });
            }
        }
    }).find('.kfe-close-panel').click(function () {
        $container.find('.kfe-smile-panel').hide();
        $container.find('.kfe-diy-panel').hide();
        $container.find('.kfe-acc-panel').hide();
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
