# KFOL_Stickers

eddie32的KFOL表情插件的魔改分支   [更新记录](https://github.com/HazukiKaguya/KFOL_Stickers/blob/master/changelog.txt）

## 安装脚本

[默认分支](https://github.com/HazukiKaguya/KFOL_Stickers/raw/master/es6_KfStickers.user.js)

[测试分支](https://github.com/HazukiKaguya/KFOL_Stickers/raw/Dev/es6_KfStickers.user.js)

0.4.9 修复自定义贴纸序列查询的bug。

0.4.6 code区域 ASCII画 适配移到测试分支，主线版本不再包含。

0.4.5 增加code区域 ASCII画 适配（更新前置）<br/>
&nbsp; &nbsp; 默认对PC版直接使用系统自带MS PGothic字体展示AA画，请[在此下载字体](https://sticker.inari.site/home/mspgothic.ttc)，<br/>
&nbsp; &nbsp; 或修改插件设置中isAlwaysInari的值为true启用外部字体。对移动版使用外部MS PGothic字体，首次加载可能偏慢。

0.4.2 自定义功能按钮大更新，功能逻辑图解
![avatar](/img/update042.png)

0.3.6 扩充随机表情池；增加图文分组（目前就一张，后续增加贴纸为热更新，按计划将更新的贴纸目前使用透明1px图片代替，后续服务端更新即可，无需更新脚本），修改颜文字分组为绘文字+颜文字分组（增加绘文字，微调颜文字顺序），恢复LL分组；微调CSS样式。


## 一些教程：

### 收藏随机贴纸教程：
![avatar](/img/st026.webp)

### 在[手机喵拉](https://m.miaola.info)上使用【[KF表情增强插件*改](https://github.com/HazukiKaguya/KFOL_Stickers)】（也可以让你不安装油猴直接在miaola用这个脚本，感谢喵拉佬）

首先在[这里](https://github.com/HazukiKaguya/KFOL_Stickers/blob/master/es6_KfStickers.user.js) 复制插件的全部代码，然后点开手机喵拉的设置里，保证设置里的增强插件是关闭的，然后勾选执行自定义脚本，在详细设置里点击添加脚本，把复制的代码粘贴到点击后弹出的文本框，点击这个二级菜单的保存后，会有弹窗，按确认。然后再点击助手设置这个一级菜单的保存。如图
![avatar](/img/mbst.webp)

pc版喵拉同理，除了gui布局外交互逻辑完全一样
