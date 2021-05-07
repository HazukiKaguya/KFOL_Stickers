// ==UserScript==
// @name        绯月表情增强插件*改
// @namespace   https://github.com/HazukiKaguya/KFOL_Stickers
// @version     0.2.3
// @author      eddie32&喵拉布丁&HazukiKaguya
// @description KF论坛专用的回复表情，插图扩展插件，在发帖时快速输入自定义表情和论坛BBCODE
// @icon        https://sticker.inari.site/favicon.ico
// @homepage    https://mistakey.top/KFStickers
// @include     http*://*9moe.com/*
// @include     https://*kforz.com/*
// @include     https://*kfmax.com/*
// @include     http*://*kfgal.com/*
// @include     https://*kfmax.com/*
// @include     https://*bakabbs.com/*
// @include     https://*365gal.com/*
// @include     https://*365galgame.com/*
// @include     https://kfol.moe.edu.rs/*
// @include     https://*miaola.info/*
// @copyright   2014-2019, eddie32 ; 2020-2021, Hazukikaguya
// @grant       none
// @license     MIT
// @run-at      document-end
// @updateURL   https://github.com/HazukiKaguya/KFOL_Stickers/raw/master/es6_KfStickers.user.js
// ==/UserScript==
//eddie32大佬的KFOL助手的表情插件的分支，目前基于5.1.3版本的喵拉分支 @copyright   2014-2019, eddie32 https://greasyfork.org/users/5415 https://github.com/liu599/KF-Emotion-UserScript
/*
本次更新日志：
0.2.3 精简表情分组，增加S1麻将脸表情分组
历史更新记录：
0.2.2 change ui;fix bugs;添加导出自定义贴纸功能，方便多设备同步（请自行避免重复贴纸地址，重复贴纸检测还没写）
0.2.1 add some stickers
0.2.0 更新使用了喵拉布丁的部分优化代码
0.1.2 专门为admin的某贴做了个替换规则（滑稽）
0.1.1 加入了清理自定义贴纸功能，改变了添加删除按钮的布局。
0.1.0 重写自定义贴纸功能，使用es6语法。
0.0.8 部分代码更新优化为ES6语法，增加实验性添加自定义贴纸功能（非es6），这是一个临时的添加自定义方案（经过精简的eddie32佬的5.2.1代码）。
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
const version = '0.2.3';
// 网站是否为KfMobile
const isKfMobile = typeof Info !== 'undefined' && typeof Info.imgPath !== 'undefined';
// 表情贴纸旧域名替换为新域名
let x = document.getElementsByTagName("img");
for (let i = 0; i < x.length; i++) {
   x[i].src=x[i].src.replace(/mistake.tech\/emote/g, "sticker.inari.site");
   //实验性功能，此储存桶地址的表情贴纸很可能和修复后的表情贴纸并不能一一对应。
   x[i].src=x[i].src.replace(/http:\/\/o6smnd6uw.bkt.clouddn.com\/xds3\/akari/g, "https://sticker.inari.site/akarin/akarin");
   x[i].src=x[i].src.replace(/https:\/\/nekohand.moe\/spsmile\/01Sora\/0xx/g, "https://sticker.inari.site/akarin/akarin");
   x[i].src=x[i].src.replace(/http:\/\/o6smnd6uw.bkt.clouddn.com\/xds\/2233/g, "https://sticker.inari.site/bili/2233");
   x[i].src=x[i].src.replace(/http:\/\/smilell2.eclosionstudio.com\/Small\/Lovelive2nd/g, "https://sticker.inari.site/bili/2233");
   x[i].src=x[i].src.replace(/bbs.kforz.com/g, "kf.miaola.info");
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

// S1麻将脸
const S1SmileList = [];
for (let i = 1; i < 33; i++) {
    S1SmileList.push(`https://sticker.inari.site/s1/${i}.gif`);
}
for (let i = 1; i < 229; i++) {
    S1SmileList.push(`https://sticker.inari.site/s1/${i}.png`);
}

// 微博&贴吧
const WeiboTbSmileList = [];
for (let i = 0; i < 101; i++) {
    WeiboTbSmileList.push(`https://sticker.inari.site/weibo/${i}.png`);
}
for(let i = 1; i < 10; i++) {
    WeiboTbSmileList.push(`http://tb2.bdstatic.com/tb/editor/images/face/i_f0${i}.png`);
}
for(let i = 10; i < 56; i++) {
    WeiboTbSmileList.push(`http://tb2.bdstatic.com/tb/editor/images/face/i_f${i}.png`);
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

// BanG Dream
const BandoriSmileList = [];
for (let i = 1; i < 41; i++) {
    BandoriSmileList.push(`https://sticker.inari.site/bangdream/bangdream (${i}).png`);
}

// 少女歌剧&公主链接
const RevPCRmileList = [];
for (let i = 1; i < 41; i++) {
    RevPCRmileList.push(`https://sticker.inari.site/revstar/revstar (${i}).png`);
}
for (let i = 1; i < 49; i++) {
    RevPCRmileList.push(`https://sticker.inari.site/redive/sticker (${i}).png`);
}

// 伪中国语
const FakeCHSSmileList = [];
for (let i = 49; i < 83; i++) {
    FakeCHSSmileList.push(`https://sticker.inari.site/fakehan/sticker (${i}).png`);
}

// 流行
const PopularSmileList = [];
for (let i = 1; i < 46; i++) {
    PopularSmileList.push(`https://sticker.inari.site/touhou/reimu/${i}.jpg`);
}
for (let i = 48; i < 54; i++) {
    PopularSmileList.push(`https://sticker.inari.site/pop/sticker (${i}).png`);
}
for (let i = 1; i < 48; i++) {
    PopularSmileList.push(`https://sticker.inari.site/pop/sticker (${i}).png`);
}

// 自定义
let userimgst=localStorage.userimgst;
userimgst==undefined?userimgst=`["https://sticker.inari.site/null.jpg"]`:userimgst=localStorage.userimgst;
const UserSmileList = JSON.parse(userimgst);

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
    S1Maj:    {datatype: 'image', title: 'S1麻将脸', addr: S1SmileList},
    WeiboTb:  {datatype: 'image', title: '微博&贴吧', addr: WeiboTbSmileList},
    Akari:    {datatype: 'image', title: 'Akari', addr: AkarinSmileList},
    lindaB:   {datatype: 'image', title: '林大B', addr: lindaBSmileList},
    RevPCR:   {datatype: 'image', title: '少歌&PCR', addr: RevPCRmileList},
    LoveLive: {datatype: 'image', title: 'LoveLive', addr: LoveliveSmallSmileList},
    Bandori:  {datatype: 'image', title: 'BangDream', addr: BandoriSmileList},
    FakeCHS:  {datatype: 'image', title: '伪中国语', addr: FakeCHSSmileList},
    Popular:  {datatype: 'image', title: '流行', addr: PopularSmileList},
    Userimg:  {datatype: 'image', title: '自定义', addr: UserSmileList},
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
    <span class="kfe-close-panel" title="版本${version}; 本分支由mistakey维护，是eddie32插件喵拉布丁分支的分支" style="cursor: pointer;"><b>:)</b></span>
    ${getSubMenuHtml()}
    <span class="kfe-close-panel">[-]</span>
    <input type="button" class="kfe-user-add" value="添加">
    <input type="button" class="kfe-user-out" value="导出">
    <input type="button" class="kfe-user-clr" value="清空">
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
    }).on('click', '.kfe-user-add', function (e) {
        e.preventDefault();
        let userimgaddr = prompt("请输入要添加的贴纸的URL，添加多个请用半角,隔开贴纸URL（添加后刷新页面生效）", "https://sticker.inari.site/inari.png");
        if (!userimgaddr) return;let userimgaddrmt = userimgaddr.split(',');let addList = [];
        for (let mt = 0; mt < userimgaddrmt.length; mt++) {
            if (/(http:|https:).*.(png|jpg|jpeg|gif|webp|bmp|tif)$/i.test(userimgaddrmt[mt])) {addList.push(userimgaddrmt[mt]);}}
        if (addList.length > 0) {let userSmileList = [];
            if (localStorage.userimgst) {
                try {userSmileList = JSON.parse(localStorage.userimgst);}
                catch (ex) {console.log(ex);userSmileList = [];}}
            userSmileList = [...userSmileList, ...addList];
            localStorage.setItem('userimgst', JSON.stringify(userSmileList));}
    }).on('click', '.kfe-user-clr', function (e) {
        e.preventDefault();
        if (confirm('确定清空自定义表情贴纸吗？')) {
            localStorage.removeItem('userimgst');
        }
    }).on('click', '.kfe-user-out', function (e) {
        e.preventDefault();
        if (UserSmileList !="https://sticker.inari.site/null.jpg"){
           prompt("自定义表情贴纸已导出，请复制",UserSmileList);
        }
        else {
           alert("自定义表情贴纸为空！");
        }
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
