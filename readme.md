# 2017IFE任务汇总:
[汇总](https://psilocine.github.io/Baidu-2017IFE/)
(全做完了哦~ FAUX!

> 走过的一些坑,作此文档用来激励自己,也希望读者(你)能与我共勉.&nbsp;&nbsp;&nbsp; -PsiloLau

### 2017年9月11日
1. with try-catch eval可以改变作用域链.
2. Boolean([]); // => true,  Number([]); // => 0,  Number({}); // => NaN,  Number(false); // => 0  
   [] == false // => true,  {} == false // NaN == 0 => false.
3. canvas绘制矢量图, svg绘制位图.
4. 1. A:IE6.0的div的内嵌div可以把父级的高度撑大, 而FireFox不可以, 要自己设置高度;
   2. 当设置为三列布局时, IE6.0的float宽度不能达到100％, 而FireFox可以. 当设置为两列布局时, 两种浏览器都可以;
   3. FF非float的div前面有同一父级的float的div, 此div若有背景图, 要使用clear: both, 才能显示背景图, 而IE6.0中不用使用clear: both;
   4. 在[text-decoration:underline]的属性下, IE6.0显示的下划线会比FireFox低一点. 在FireFox中, 部分笔画会在下划线的下面1个象素左右.
5. 非块级元素无法设宽高; float会把浮动元素变成块级元素; 绝对定位脱离文档流.

        <div style=”width:400px;height:200px;”>
            <span style=”float:left;width:auto;height:100%;”>
                <i style=”position:absolute;float:left;width:100px;height:50px;”>hello</i>
            </span>
        </div>
span height继承div 所以高为200px 宽度auto由内容决定, i脱离文档流, span宽度为0.  
6. BFC: 满足以下一项即可成为BFC
```javascript
float: left | right
position: fixed | absolute
display: inline-block | table-cell | table-caption | flex | inline-flex
overflow: hidden | scroll | auto
```
  用BFC来做什么:1.外边距折叠; 2.容器无高度包含浮动元素; 3.阻止文字环绕

### 2017年9月10日
1. Flash提供了ExternalInterface接口与JavaScript通信, ExternalInterface有两个方法：call和addCallback. call让Flash调用js里的方法, addCallback是用来注册flash函数让js调用.
2. a:link {} a:visited {} a:hover {} a:active {}  (固定顺序: LoVe HAte 记忆口诀 爱与恨).
3. json字符串必须用双引号. stringify()把一个javascript对象序列化为json字符串, parse()把json字符串转为JavaScript对象. stringify还能传两个可选参数, 第一个是过滤器, 可以是数组,函数. stringify不传空格数是不包含空格字符和缩进的, 所以第二个参数是空格数(数值 最大为10), 可以传非数值. parse()有一个可选参数, 是一个函数(还原函数).
4. 跨域解决方案 CORS, ie8用XDomainRequest对象支持, 其他浏览器用XHR对象支持. 图像ping和jsonp也能解决跨域通信.
5. 作用域安全的构造函数(可能漏写new, 保证函数健壮), 惰性载入函数(不必每次执行if语句).
6. console.log(1+ +"2"+"2"); // 32   +"2" + => 一元操作符, 1+ +"2" 相当于1+2.

### 2017年9月9日
```JavaScript
function Foo(){
  var i=0;
  return function(){
    document.write(i++);
  }
}
var f1=Foo();
f1();
f1();
```
1. 上述题目答案是 0 1 别被var i = 0给迷惑, 这里考点是闭包的性质. 这里可以看成var f1 = function(){document.write(i++);}; 闭包可以通过作用域链读取上层变量, 另一个重要的性质就是会把这些变量的值保存在内存中, 所以f1()后 i = 1 保存在内存中.
2. console.log('Value is ' + (val != '0') ? 'define' : 'undefine'); 输出define, 前面的'Value is'是障眼法, 实际上考察三目运算符和符号优先级, 加号+优先级比? :高, 所以无论val有无定义, ('Value is' + (...))一定是true.
3. try-catch-finally, 如果代码包含finally语句, 无论是try还是catch的return语句都会被忽略. 因此有finally就不用写catch了, ie7之前需要写catch, finally才会执行.

### 2017年9月1日
1. html5事件 contenxtmenu可以自定义右键菜单. 通过事件绑定的方式定义范围, 然后右键就可以触发写好的菜单(需要阻止默认行为和绝对定位用client来定位), 这里需要注意的是ie和高级浏览器的阻止默认行为写法不一样. ie: event.returnValue = false; 高级浏览器: event.preventDefault();

### 2017年8月31日
1. 事件委托可以解决多个事件监听内存多性能差的问题, 原理是利用了事件冒泡, 和event的target配合, 只添加一个事件处理程序, 用switch方法处理子节点的所有事件.

### 2017年8月30日
1. clientX, clientY pageX, pageY screenX, screenY区别
2. mouseenter, mouseleave mouseover, mouseout区别
3. click dblclick触发原理, mousedown mouseup click, mousedown mouseup click mousedown mouseup click dblclick.  mousedown, mouseup被取消, click失效
4. typeof function(){} => 'function'; typeof (function(){})() => 'undefined'  没有return都是undefined; typeof (function(){return 1})() => 'number'

### 2017年8月29日
addEventListener和attachEvent的一些细节
1. 给页面中最后一代监听addEvnetListener时, true和false都只会在事件冒泡阶段执行. 
2. 解除监听的时候需要和添加监听时候的参数相同
```javascript
var btn = document.getElementById('myBtn');
btn.addEventListener('click', function() {
  alert('hi');
}, false);

// 解除无效, 此时的 function(){} 并不是上述那一个.
btn.removeEventListener('click', function() {
  alert('hi');
}, false); 
```
解决的方法就是给函数一个变量, 传入变量即可.  
3.addEventListener执行顺序是从上往下, ie的attachEvent则相反. ie和高级浏览器取消冒泡和取消默认行为也不一样, 需要做兼容.

### 2017年8月28日 15:28:51
1. css选择器的问题关于.的连接, 如 li.open.menu 是找到li元素同时有open和menu的类. li.open#menu, 找到 id是menuclass是open的li, .open.menu是找到同时具有这两个类名的任意标签

### 2017年8月27日 19:23:49
1. 函数表达式和函数声明
```javascript
var getName = function () { console.log('hsbds'); };
function getName () { console.log('hssm'); }

getName();
```
输出结果为hssm, 函数表达式在作用域里会变量提升, 而函数声明会函数提升, 理解了这一点就好办了, 可以想象函数声明的任何函数, 都是在作用域的最上方, 因此会被函数表达式覆盖.

### 2017年8月24日 13:06:05
1. 操作节点的四种方法 appendChild(), insertBefore(), replaceChild(), removeChild().
  最常用的appendChild(), 一个参数, 用于在父节点的类数组childNodes列表末尾添加一个节点. 添加完成后, childNodes的最后一个节点关系指针得到相应更新. 更新完成后, appendChild()返回新增节点.
```javascript
var returnedNode = someNode.appendChild(newNode);
alert(returnedNode == newNode);  // true
alert(newNode == someNode.lastChild);  // true
```
  如果要把节点放在childNodes的特定位置, 使用insertBefore(), 两个参数, 第一个是需要插入的节点, 第二个是插入节点的位置. 第二个参数如果是null, 和appendChild()效果一致.
```javascript
var returnedNode = someNode.insertBefore(newNode, null);
alert(returnedNode == someNode.lastChild);  // true

var returnedNode = someNode.insertBefore(newNode, someNode.firstChild);
alert(returnedNode == newNode);  // true
alert(newNode == someNode.firstChild); // true

var returnedNode = someNode.insertBefore(newNode, someNode.lastChild);
alert(returnedNode == newNode);  // true
alert(newNode == someNode.childNode[someNode.childNode.length-2]); // true  newNode位于倒二
```  

replaceChild(), 替换节点, 两个参数, 第二个参数是要移除的节点.
```javascript
// 替换第一个子节点 替换成newNode
var returnedNode = someNode.replaceChild(newNode, someNode.firstChild);
```

removeChild(), 移除节点, 一个参数.
```javascript
// 移除第一个子节点
var returnedNode = someNode.removeChild(someNode.firstChild);
```

还有cloneNode(), 可传参布尔值true, cloneNode(true)表示深拷贝, 反之为浅. 还要有上述的添加节点方法, 不然拷贝完的副本是没有父节点的, 不在Dom树上.

### 2017年8月23日 23:44:38
1. scss写伪类的时候会有bug
```javascript
  a {
    :hover {
      ...
    }
  }
```
输出的css是
```javascript
  a {
    ...
  }

  a :hover {  // => 相当于 a *:hover
    ...
  }
```
解决的方法是在:hover前面加上&即可.

### 2017年8月22日 21:27:25
1. encodeURI()和encodeURIComponent()的区别, 二者都可以将传递的字符串进行编码, 前者对(：;/?:@&=+$,#)不会进行转义, 重点就是这个斜杠/和:. 比如一段 http://github.com/p silo 前者输出http://github.com/p%20silo, 后者输出http%3A%2F%2Fgithub.com/p%20silo
2. 上述说到url地址, 针对url各个部分, BOM的location也要相当注意. http://github.com:80/psilocine#Home?name=psilo&password=123
    1. location.hash => 锚部分 #Home
    2. location.host => 主机名和端口 github.com:80
    3. location.hostname => 主机名 github.com
    4. location.href => 完整URL http://github.com:80/psilocine#Home
    5. location.pathname => 路径名 /psilocine
    6. location.port => 端口号 80
    7. location.protocol => 协议 http:
    8. location.search => 返回查询部分 ?name=psilo&password=123

### 2017年8月18日 13:53:23
1. 还是md文档的坑, 这次关于代码块如何显示, 为何我们的代码块有时候显示有时候不显示?
	 有下列方法可以抢救:
	 1. 在要显示的代码块前后在加上两行, 然后每行加上三个`, 注意这里不是单引号 是esc下面的那个, 有很多网站都说是单引号, 一度让我很头疼. 这种方法可以显示代码的行数. 还可以在第一行的```后面写上语言, 比如javascript.
	 2. 在代码块前面缩进4个空格, 这里(有时候)有个坑, 也是我最气的, 就是代码前一行必须要空一行, 就可以了. 当然你也可以在上一行末尾加上2个空格, md也会将其显示为空一行.
	 3. 最无脑的, 就是找下在线md编辑器, 在里面尝试下, 直到可以了后再发布, 省得发布修改发布.
    
### 2017年8月16日 22:02:50
1. md文档中的链接, [psilo的github](http://github.com/)psilocine)如果链接里面有括号, 这种方法不适用, 会提前终止.  
   这时候就要选择其他的方法:
   1. 第一, 可以用转义, 左右括号在href里的表示分别是%28 %29.
   2. 用[psilo的github][id], 然后在文档的任意一行写上id的定义即可, 注意要加上中括号.
   3. 用[psilo的github]: 地址 然后同样在文档任意一行写上[psilo的github][]就行了.

### 2017年8月12日 15:48:39
1. 要知道DOMContentLoaded和window.onload的区别
2. 了解从输入url到得到html的详细过程、html css js渲染过程等
3. 横向nav li有间距. 这是因为用了inline-block后, html的文本节点也就是空格也会算进去,解决方法大概分以下几种:
    1. 用float left代替display inline-block;
    2. li标签之间不要有文本节点, (压缩后没此问题;
    3. 给ul一个font-size:0, (缺点是要在li再设font-size;

### 2017年8月9日 17:46:53
1. 原型的5个重要规则.
    1. 所有的引用类型(对象,数组,函数)都具有对象特征, 即可自由扩展属性.
    2. 所有的引用类型都有一个__proto__属性, 属性值是一个普通的对象.
    3. 所有的函数, 都有一个prototype属性, 属性值也是一个普通的对象.
    4. 所有的引用类型,__proto__属性值指向它的构造函数的'prototype'属性值.
    5. 当试图得到一个对象的某个属性时, 如果这个对象本身没有, 那么会去它的__proto__(它的构造函数的prototype)中寻找

### 2017年7月9日 17:47:06
1. z-index 只能在定位元素在奏效, 如position:absolute
2. 做nav时, 用ul li遇到图片和文字一起的时候, 默认文字在图片的baseline, 文字会往下移动, 这时候不用调负margin, 只用vertical middle就行

### 2017年5月20日 23:58:26
1. class命名最好大于等于三个字母, 如advertisement, 不要写ad (会被广告插件过滤掉,  写adv, avt

### 2017年5月18日 17:04:42
1. type='submit' 会刷新页面, 填入的数据都刷没了
2. hexo d更新时, 会把不是hexo的文件渲染掉(包括readme.md  解决方法就是在根目录的 _config.yml里面找到skip_render: 写入你不想被渲染掉的文件, 然后把文件放入public即可.
3. MongoDB连接时, mongod --dbpath 这条的路径最好在根目录下建个目录, 即一层目录, 不然会连接失败. 
4. .jade格式的文件不要用tab不然会错误, 用空格即可.(我用的notepad++来编辑, 在设置里可以把tab设置为空格

### 2017年3月22日 23:47:50
1. 掌握calc方法 css3重要方法 解决盒子溢出问题 2017年8月12日16:08:35 解决 calc在低版本ie不兼容
2. @media screen and (max/min-width:???px) { ... } 媒体查询, 能够让浏览器在不同宽度显示不同表现

### 2017年3月17日 18:27:50
1. 同一css里 background-size:cover; (自适应浏览器宽度)要放在 background-image:url(); 后面, 不然不起作用.
2. li里面的a标签 用display:inline-block  height100% width100% 可以扩充到整个li, hover时比较美观.
3. eg: .demo:hover~ .box 是hover demo类时 box类发生变化  前提是.box的css要有transition等属性 注意不同浏览器不同写法

### 2017年3月12日 22:19:58
1. 学会绘制三角形css方法 (虽然以后学bs好像更简洁
	用span或其他标签做个空容器,然后css写border
	border-left:5px solid transparent
	border-right:5px solid transparent	(注意这里的5px可改 不过要左右相等 才能对称
	border-bottom:10px solid 颜色自定义 (注意这里的10px可改  不过要是左右的和 才能是等边三角形
	display:inline-block; 这里inline-block是能让后面的在同一行显示

### 2017年3月2日 00:14:38
1. 理解文本流和文档流(normal flow)区别 =>2017年5月20日 00:14:04解决
2. 什么是dom和cssom => 2017年8月12日16:05:14 解决
3. box-sizing干什么的 => 2017年8月12日16:05:26 解决 两种模式下区别

### 2017年3月1日 00:05:24
1. 双飞翼布局和圣杯布局 要搞透 =>2017年5月20日 00:13:49 解决
2. 文本首行缩进用css { text-indent: 属性值 ;} 

### 2017年2月26日 22:02:37
1. li横向排列 用display:inline
2. 顶部浮动float的导航栏 下方要清除浮动clear:both/left/right 不然会遮挡住 补充 2017年3月1日 00:07:46  clearfix的多种方法,优缺点 =>2017年5月20日 00:10:01解决 clear:both 添加div破坏语义; overflow:hidden 会影藏超出父元素的内容; ::after伪元素 没有明显弊端,适合使用
3. 顶部导航栏左右两边有空隙 待解决/ok => 2017年2月26日 23:19:50解决 浏览器自己的坑 本身浏览器body有margin和padding, 需要把其二清除.

### 2017年2月26日 23:03:14 
1. 补充一点, 用notepad++写 用utf-8 无ROM 编写 上传github 中文会乱码!