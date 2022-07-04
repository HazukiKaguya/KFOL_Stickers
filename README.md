# KFOL_Stickers

eddie32的KFOL表情插件的魔改分支   

[更新记录](https://github.com/HazukiKaguya/KFOL_Stickers/blob/master/changelog.txt)

## 安装脚本

[默认分支](https://github.com/HazukiKaguya/KFOL_Stickers/raw/master/es6_KfStickers.user.js)

[测试分支](https://github.com/HazukiKaguya/KFOL_Stickers/raw/Dev/es6_KfStickers.user.js)


## 一些教程：

### 云同步功能逻辑图解：
![avatar](https://p.inari.site/guest/22-07/03/62c15908556ee.png)   
【云】按钮显然是云同步功能，【令】按钮是登录功能，因为云同步实现并使用了自己的一套用户系统。  
![avatar](https://p.inari.site/guest/22-07/03/62c15a22a0652.png)
![avatar](https://p.inari.site/guest/22-07/03/62c15cbda81ec.png)   
未登录状态云同步提醒【未找到有效Token，请先登录！】  
登录态过期云同步提醒【Token已失效，请重新登录！】  

![avatar](https://p.inari.site/guest/22-07/03/62c15a573e8f1.png)
![avatar](https://p.inari.site/guest/22-07/03/62c15a950f765.png)
![avatar](https://p.inari.site/guest/22-07/03/62c15b18e982c.png)   
注册与登录系统。   
  
云同步功能浅显易懂就不多加介绍了。  

### 删改指定自定义贴纸功能逻辑图解：
![avatar](/img/update042.png)

### 收藏随机贴纸教程：
![avatar](/img/st026.webp)

### 在[手机喵拉](https://m.miaola.info)上使用【[KF表情增强插件*改](https://github.com/HazukiKaguya/KFOL_Stickers)】（也可以让你不安装油猴直接在miaola用这个脚本，感谢喵拉佬）

首先在[这里](https://github.com/HazukiKaguya/KFOL_Stickers/blob/master/es6_KfStickers.user.js) 复制插件的全部代码，然后点开手机喵拉的设置里，保证设置里的增强插件是关闭的，然后勾选执行自定义脚本，在详细设置里点击添加脚本，把复制的代码粘贴到点击后弹出的文本框，点击这个二级菜单的保存后，会有弹窗，按确认。然后再点击助手设置这个一级菜单的保存。如图
![avatar](/img/mbst.webp)

pc版喵拉同理，除了gui布局外交互逻辑完全一样
