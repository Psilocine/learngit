# 2017IFE任务汇总:
[汇总](https://psilocine.github.io/learngit/index.html)
(全做完了哦~ FAUX!

> 走过的一些坑,作此文档用来激励自己,也希望读者(你)能与我共勉.              -PsiloLau

### 2017年2月26日 23:03:14 
1. 补充一点, 用notepad++写 用utf-8 无ROM 编写 上传github 中文会乱码!

### 2017年2月26日 22:02:37
1. li横向排列 用display:inline
2. 顶部浮动float的导航栏 下方要清除浮动clear:both/left/right 不然会遮挡住 补充 2017年3月1日 00:07:46  clearfix的多种方法,优缺点 =>2017年5月20日 00:10:01解决 clear:both 添加div破坏语义; overflow:hidden 会影藏超出父元素的内容; ::after伪元素 没有明显弊端,适合使用
3. 顶部导航栏左右两边有空隙 待解决/ok => 2017年2月26日 23:19:50解决 浏览器自己的坑 本身浏览器body有margin和padding, 需要把其二清除.

### 2017年3月1日 00:05:24
1. 双飞翼布局和圣杯布局 要搞透 =>2017年5月20日 00:13:49 解决
2. 文本首行缩进用css { text-indent: 属性值 ;} 

### 2017年3月2日 00:14:38
1. 理解文本流和文档流(normal flow)区别 =>2017年5月20日 00:14:04解决
2. 什么是dom和cssom => 2017年8月12日16:05:14 解决
3. box-sizing干什么的 => 2017年8月12日16:05:26 解决 两种模式下区别

### 2017年3月12日 22:19:58
1. 学会绘制三角形css方法 (虽然以后学bs好像更简洁
	用span或其他标签做个空容器,然后css写border
	border-left:5px solid transparent
	border-right:5px solid transparent	(注意这里的5px可改 不过要左右相等 才能对称
	border-bottom:10px solid 颜色自定义 (注意这里的10px可改  不过要是左右的和 才能是等边三角形
	display:inline-block; 这里inline-block是能让后面的在同一行显示

### 2017年3月17日 18:27:50
1. 同一css里 background-size:cover; (自适应浏览器宽度)要放在 background-image:url(); 后面, 不然不起作用.
2. li里面的a标签 用display:inline-block  height100% width100% 可以扩充到整个li, hover时比较美观.
3. eg: .demo:hover~ .box 是hover demo类时 box类发生变化  前提是.box的css要有transition等属性 注意不同浏览器不同写法

### 2017年3月22日 23:47:50
1. 掌握calc方法 css3重要方法 解决盒子溢出问题 2017年8月12日16:08:35 解决 calc在低版本ie不兼容
2. @media screen and (max/min-width:???px) { ... } 媒体查询, 能够让浏览器在不同宽度显示不同表现

### 2017年5月18日 17:04:42
1. type='submit' 会刷新页面, 填入的数据都刷没了
2. hexo d更新时, 会把不是hexo的文件渲染掉(包括readme.md  解决方法就是在根目录的 _config.yml里面找到skip_render: 写入你不想被渲染掉的文件, 然后把文件放入public即可.
3. MongoDB连接时, mongod --dbpath 这条的路径最好在根目录下建个目录, 即一层目录, 不然会连接失败. 
4. .jade格式的文件不要用tab不然会错误, 用空格即可.(我用的notepad++来编辑, 在设置里可以把tab设置为空格

### 2017年5月20日 23:58:26
1. class命名最好大于等于三个字母, 如advertisement, 不要写ad (会被广告插件过滤掉,  写adv, avt

### 2017年7月9日 17:47:06
1. z-index 只能在定位元素在奏效, 如position:absolute
2. 做nav时, 用ul li遇到图片和文字一起的时候, 默认文字在图片的baseline, 文字会往下移动, 这时候不用调负margin, 只用vertical middle就行

### 2017年8月9日 17:46:53
1. 原型的5个重要规则.
    1. 所有的引用类型(对象,数组,函数)都具有对象特征, 即可自由扩展属性.
    2. 所有的引用类型都有一个__proto__属性, 属性值是一个普通的对象.
    3. 所有的函数, 都有一个prototype属性, 属性值也是一个普通的对象.
    4. 所有的引用类型,__proto__属性值指向它的构造函数的'prototype'属性值.
    5. 当试图得到一个对象的某个属性时, 如果这个对象本身没有, 那么会去它的__proto__(它的构造函数的prototype)中寻找

### 2017年8月12日 15:48:39
1. 要知道DOMContentLoaded和window.onload的区别
2. 了解从输入url到得到html的详细过程、html css js渲染过程等
3. 横向nav li有间距. 这是因为用了inline-block后, html的文本节点也就是空格也会算进去,解决方法大概分以下几种:
    1. 用float left代替display inline-block;
    2. li标签之间不要有文本节点, (压缩后没此问题;
    3. 给ul一个font-size:0, (缺点是要在li再设font-size;
    
### 2017年8月16日 22:02:50
1. md文档中的链接, [psilo的github](http://github.com/)psilocine)如果链接里面有括号, 这种方法不适用, 会提前终止.  
   这时候就要选择其他的方法:
   1. 第一, 可以用转义, 左右括号在href里的表示分别是%28 %29.
   2. 用[psilo的github][id], 然后在文档的任意一行写上id的定义即可, 注意要加上中括号.
   3. 用[psilo的github]: 地址 然后同样在文档任意一行写上[psilo的github][]就行了.

### 2017年8月18日 13:53:23
1. 还是md文档的坑, 这次关于代码块如何显示, 为何我们的代码块有时候显示有时候不显示?
	 有下列方法可以抢救:
	 1. 在要显示的代码块前后在加上两行, 然后每行加上三个`, 注意这里不是单引号 是esc下面的那个, 有很多网站都说是单引号, 一度让我很头疼. 这种方法可以显示代码的行数. 还可以在第一行的```后面写上语言, 比如javascript.
	 2. 在代码块前面缩进4个空格, 这里有个坑, 也是我最气的, 就是代码前一行必须要空一行, 就可以了.
	 3. 最无脑的, 就是找下在线md编辑器, 在里面尝试下, 直到可以了后再发布, 省得发布修改发布.