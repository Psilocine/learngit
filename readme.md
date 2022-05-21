## 下面是自己的一些坑和笔记

> 走过的一些坑,作此文档用来激励自己,也希望读者(你)能与我共勉.&nbsp;&nbsp;&nbsp; -PsiloLau

### 2022 年 05月 20 日
1. 大数相加
```typescript
function twoSum(a: string, b: string): string {
  // 获得最大长度方便补0
  const len: number = Math.max(a.length, b.length)
  a = a.padStart(len, '0')
  b = b.padStart(len, '0')

  // 从后往前逐位相加
  let flag: number = 0; // 进位
  let temp: number = 0; // 累加的值
  let sum: string = '';
  for (let i = len - 1; i >= 0; --i) {
    temp = parseInt(a[i]) + parseInt(b[i]) + flag;
    flag = Math.floor(temp / 10)
    sum = temp % 10 + sum
  }
  // 最后一位的考虑
  if (flag > 0) {
    sum = flag + sum;
  }

  return sum;
}
```
2. 大数相乘
```typescript
function twoMultiply (num1: string, num2: string): string {
  const len1 = num1.length;
  const len2 = num2.length;
  const ans: number[] = new Array(len1 + len2 - 1).fill(0);

  for (let i = len1 - 1; i >= 0; i--) {
    for (let j = len2 - 1; j >= 0; j--) {
      if (!ans[i + j]) {
        ans[i + j] = 0;
      }
      ans[i + j] += parseInt(num1[i]) * parseInt(num2[j]);
    }
  }
  let flag = 0;
  let temp = 0;
  for (let i = ans.length - 1; i >= 0; i--) {
    temp = ans[i] + flag;
    flag = Math.floor(temp / 10);
    ans[i] = temp % 10;
  }

  // 说明首位还有进位
  if (flag) {
    ans.unshift(flag);
  }

  return ans.join("");
}
```

### 2022 年 05月 07 日
1. 尾调用：当一个函数执行时的最后一个步骤是返回另一个函数的调用，这就叫做尾调用。
函数在调用时有调用栈记录，函数执行结束后依次上外弹出。
函数嵌套调用没有使用 return，js 引擎会认为没执行完，保留调用栈记录
如果所有的函数都是尾调用，那么在调用栈始终只有一条调用帧，这样会节省大量的内存，成为尾调用优化
```typescript
function foo():void {
  bar();
}
function bar():void {
  console.log('bar')
}
foo();

// 优化后
function foo():void {
  return bar();
}
function bar():void {
  console.log('bar')
}
foo();
```
2. 尾递归：了解了尾调用，尾递归就是在最后调用（return）自身。尾递归和递归有什么区别呢？
```typescript
// 阶乘
function factorial (num: number): {
  if (num === 1) return 1;
  return num * factorial(num - 1);
}
factorial(5);            // 120
factorial(500000);       // Uncaught RangeError: Maximum call stack size exceeded

// num 也视作当前调用帧的变量。操作引擎分配给 js 引擎调用栈内存是有大小限制的
// 如果超出内存范围，就会栈溢出错误

// 尾递归
function factorial (num: number, total: number): {
  if (num === 1) return total;
  return factorial(num - 1, num * total);
}

factorial(500000, 1); // ok
// 通过尾递归优化，把空间复杂度从 O(n) 变为 O(1)
```

### 2022 年 04月 05 日
uniapp + vue3 的坑
1. 组件用 defineProps 解构的 props，watch 和 computed 都没有效果
2. 在微信小程序里不能用官方的组件名引入组件，比如 Button

### 2021 年 11 月 22 日
1. 正则匹配的反向引用，要注意的是引用的是匹配后的字符，而不是匹配的规则
```javascript
const reg = /('|")http\1/
const str = "'http'" // 匹配到
const str2 = "'http\"" // null
```

### 2021 年 9月 1 日
1. vue composition-api使用ref获取template的ref节点，别忘了setup方法return出去，否则声明的ref出错
```javascript
setup () {
  const someRef = ref(null); // 如果不 return 这个变量，则只是 value 为 null 的变量
  const someRef = ref(""); // 同理
}
```

### 2021 年 8月 27 日
1. iOS9.3的Element.classList.value是undefined，可以通过逻辑或className解决。奇怪的是caniuse上iOS9是支持classList的

### 2021 年 3月 30 日
分享两个兼容性差但好用的特性。
1. 最近的业务需要输入法的确认直接搜索触发方法。input标签的`enterkeyhint`这个attr能够增加用户的意识和体验，现在兼容性还很不好，但是能增加一部分系统的用户体验。下面会把输入法的右下角按钮变成我们想要的文案，比如`search`就是“搜索”、`done`是“完成”、`send`是“发送”、`go`是“前往”等等。结合keypress方法就可以实现比较完整的逻辑
```html
<input enterkeyhint="search" />
```

2. 遇到包含回车符↵的整串字符串，v-html不能完全正确解析，要么replace全局替换成换行符，要么用`white-space`:`break-spaces`, 十分好用。

### 2021 年 2月 25 日
svg的viewBox、height、width属性渲染的时候就会计算好，如果想通过fontSize去改变svg的大小，需要把svg的内容重新渲染才会更新property属性

### 2020 年 12 月 2 日
vue-router跳转，path和params一起传参，params会失效。因为path里可以写params参数
```javascript
// 解决办法 1
// 用 name 代替 path
router.push({
  name: '',
  params: {}
})

// 2
// 用query代替
router.push({
  path: "/foo",
  query: {}
})
```

### 2020 年 10 月 26 日

react 和 vue 的局部样式实现的区别

```javascript
vue通过PostCSS给有scoped属性的style赋值独一的动态属性，如：data-v-1234567

react是编译后直接在样式名后面加随机字符串，改变样式名从而达到局部样式无污染的效果
```

### 2020 年 10 月 12 日

安卓微信浏览器 window.location.reload 无效，解决方法是在链接地址后加时间戳传参

### 2020 年 9 月 28 日

内联元素内联级元素都会存在幽灵空白节点，在移动端 rem 布局的情况下，具体页面不设置字体的话会导致幽灵空白节点字体和根字体一样大（比如 font-size:50px）, 造成布局错误

### 2020 年 9 月 23 日

v-html 里样式无效的问题，需要用样式穿透才能渲染 v-html 里的标签类名

```vue
<style scope>
.father >>> .child {
}
</style>

<style scope lang="scss">
.father {
  &::v-deep {
    .child {
    }
  }
}
</style>
```

### 2020 年 9 月 17 日

苹果全面屏底部按钮留白的适配，参考小程序的 safe area。缺点是只支持 ios11 以上

```css
/* 首先head里配置 meta name='viewport' content='viewport-fit=cover' */
padding-bottom: constant(safe-area-inset-bottom)
padding-bottom: env(safe-area-inset-bottom) /* 兼容 ios11.2+，且要写在constant之后 */
/* 同理还有 top left right 的安全区域距离*/
```

### 2020 年 9 月 16 日

audio 标签在 ios 下会出现只能播放第一次的问题，通过 new Audio 解决

```javascript
if (isIOS) {
  const audio = new Audio("音源");
  audio.play();
}
```

### 2020 年 9 月 1 日

ios 下 transparent 属性不是全透明，而是偏黑色，需要使用 rgba(255,255,255,0)来兼容透明

### 2020 年 8 月 31 日

ios9 下快速滚动到底部会导致固定元素不可点击，设置一下样式可以解决

```css
html,
body {
  height: 100%;
  overflow-y: scroll; /* must be scroll, not auto */
  -webkit-overflow-scrolling: touch;
}
```

### 2020 年 8 月 18 日

提供给 lottie 使用的 json 如果有额外图片资源，可能会导致图片加载不出来
解决的方法有两种:

1. 修改 json 文件里图片的路径
2. 将 json 改成 js 文件，图片用 require 引入

### 2020 年 8 月 10 日

1. 解构赋值可以剔除不想暴露或不想要的属性

```javascript
const obj = { a: 1, b: 2, c: 3 };

const { a, ...variable } = obj;
// a属性排除，variable = { b: 2, c:3 }
```

2. 解构赋值还可以给定默认值，防止代码执行中报错的可能

```javascript
const obj = { a: 1, b: 2, c: 3 };

const { d } = obj; // d = undefined

const { a = 10, d = 4 } = obj; // a = 1 默认值被实际值覆盖， d = 4
```

### 2020 年 6 月 10 日

1. document.execcommand 复制功能，当 select 的元素不能有下述几种情况，否则无效

```
1. input、textarea的display:none
2. input、textare有disabled=true
3. input 宽||高为0
4. input有hidden=true
```

### 2020 年 5 月 6 日

1. wbr（Word Break Opportunity）标签可以规定在文本中的何处适合添加换行符，XML/wbr/HTTP/wbr/Request

### 2020 年 4 月 16 日

1. vuex 中多个 modules 如何共用 mapActions

```javascript
methods: {
  ...mapActions({
    'method1': 'module1/method1',
    'method2': 'module2/method2'
  })
}
```

### 2020 年 4 月 4 日

1. Number.MAX_SAFE_INTEGER: JavaScript 能够准确表示的整数范围在-2^53 到 2^53 之间（不含两个端点），超过这个范围，无法精确表示这个值

```javascript
var a = Math.pow(2, 53);
var b = Math.pow(2, 53) + 1;
var c = Math.pow(2, 53) - 1;
a === b; // true

// es6 引进 Number.MIN_SAFE_INTEGER和Number.MAX_SAFE_INTEGER两个常量, 来表示这个范围的上下限
var d = Number.MAX_SAFE_INTEGER;
c === d; //

Number.MIN_SAFE_INTEGER; // -9007199254740991 or -(2^53 - 1)
```

2. es6 新增 Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内

```javascript
Number.isSafeInteger("a"); // false
Number.isSafeInteger(1.2); // false
Number.isSafeInteger(3); // true
```

### 2020 年 3 月 27 日

1. cookie、session 区别

```html
数据存放位置不同, c存放在客户端的浏览器上, s存放在服务器上 安全性不同, c会与http请求发送,
可能被劫持, s不会有安全问题 性能不同, s在一定时间内存储在服务器上, 访问增多会占用服务器性能
存储容量不同, c一般4kb且只能保存20个, s无限制
```

2. position 有几种属性

```css
initial /* 默认值 */
inherit /* 继承父级 */
relative /* 相对定位, 没脱离文档流, 但能使z-index生效 */
absolute /* 绝对定位, 相对有relative的父元素定位 */
fixed /* 固定定位, 相对视口定位 */
sticky /* 粘性定位, 兼容性不好 */
```

3. http 状态码

```javascript
1xx: 临时的响应
  100 continue
2xx: 服务器成功的接收了客户端请求
  200 ok
3xx: 客户端浏览器必须采取更多操作来实现请求
  301 Moved Permanently 被请求的资源已永久移动到新位置
  302 Found 临时重定向
  304 Not Modified
4xx: 客户端发生错误
  400 Bad Request 服务器无法理解请求的格式
  403 Forbidden 禁止访问
  404 Not Found 找不到如何与 URI 相匹配的资源
  405 Method Not Allowed 请求行中指定的请求方法不能被用于请求相应的资源
5xx: 服务端发生错误
  500 Internal Server Error 服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理
  502 Bad Gateway 一般是在部署更新
  503 Service Unavailable 由于临时的服务器维护或者过载，服务器当前无法处理请求
```

### 2020 年 3 月 26 日

1. 事件对象 event

```javascript
MouseEvent: {
  isTrusted: true, // 是否用户触发
  metaKey: false, // meta键是否被按下并保持住(macOS Cmd键/ windows Win键)
  type: "click", // 事件类型
  bubbles: true, // 事件是否冒泡
  cancelable: true, // 是否可以取消事件的默认事件
  defaultPrevented: false, // 是否调用了preventDefault
  cancelBubble: false, // 是否阻止冒泡
  returnValue: true, //  是否阻止默认事件
  layerX: 0, // 相对当前盒子模型的左上角距离, border起算
  offsetX: 0, // 相对当前盒子模型的左上角距离, content起算

  target: dom, // firefox, 实测也有高级浏览器也有srcElement
  srcElement: dom, // ie才有
}
```

### 2020 年 3 月 6 日

1. vue-router 报 NavigationDuplicated 错是因为 push/replace 同样的路由导致.

### 2020 年 3 月 1 日

1. Blob 配合 URL.createObjectURL 可以做简易爬虫

```javascript
var obj = { a: 2 }; // 需要爬虫的数据
var blob = new Blob([JSON.stringify(obj, null, 2)]);

var blobHref = URL.createObjectURL(blob); // 得到 blob: 开头的blob流地址

var a = document.createElement("a");
a.href = blobHref;
a.download = "xxx.json"; // 下载名称
a.click();
```

### 2020 年 2 月 27 日

1. 在 vue 下，webpack 的 url-loader 把图片转成 base64 时，页面 template 里 img 的 src 符合条件的时候会变成[object Module]导致显示失败，在 url-loader 配置加上 esModule = false 即可

```html
<img src="[object Module]" />
```

```javascript
// vue.config.js
chainWebpack: (config) => {
  config.module
    .rule("images")
    .use("url-loader")
    .loader("url-loader")
    .tap((options) => Object.assign(options, { limit: 10000, esModule: false }));
};

// or vue-cli2
module: {
  rules: [
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [
        {
          loader: "url-loader", // 'file-loader'
          options: {
            limit: 10000,
            esModule: false
          }
        }
      ]
    }
  ];
}
```

### 2020 年 2 月 25 日

1. ios 不支持 webp 的图片格式

### 2020 年 1 月 22 日

1. 一行代码实现优雅的判断类型

```javascript
const isType = (type) => (target) => `[object ${type}]` === Object.propotype.toString.call(target);

const isArray = isType("Array");
const isString = isType("String");

isArray([]); // true
isString(""); // true
```

### 2019 年 12 月 30 日

1. 类的静态方法调用同类的静态方法，可以用 this 也可以用类名

```javascript
class Dog() {
  ...,
  static eat() {
    //
  }
  static sleep() {
    Dog.eat();
    this.eat();
  }
}
```

### 2019 年 12 月 23 日

1. hexo 部署报错：git@github.com: Permission denied (publickey)，排查后发现是密钥的权限过于开放导致无法连接：Permissions 0777 for 'id_rsa' are too open. 重制密钥的权限 700 即可.

### 2019 年 12 月 13 日

1. 接口返回文件流的图片，该如何转成 base64，用 axios 请求时就要加上 responseType 的参数。

```javascript
axios.get(url, {
  ...,
  responseType: 'arraybuffer'
}).then(res => {
  return `data:image/png;base64,${btoa(
    new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
  )}`; // 返回什么后缀就用什么后缀，png 就用 data:image/png, gif 就用 data:image/gif
});
```

### 2019 年 12 月 4 日

1. history 模式弊端：当所有项目部署在统一域名下不同文件夹时就会出现问题，这时候切换路由会把路径全部切换，需要服务端协同解决
2. web 端可以访问本地服务，只需要把接口路径改成 127.0.0.1:port 的前缀（需注意跨域）即可
3. git 配置用户名密码除了配置全局还可以配置单独工程，我用这个方法解决了 github 上 commit 日历没有提交的问题

```javascript
// 全局
git config --global user.name xx
git config --global user.email xx

// 单独工程
git config --local user.name xx
git config --local user.name xx
```

### 2019 年 12 月 2 日

1. vue-cli3 的静态文件夹不是路径下的 static 而是 public。
2. webpack-dev-server 出于安全考虑，默认检查 hostname，如果未匹配则不能访问，在 devServer 添加属性 disableHostCheck: true 就可以跳过检查。

### 2019 年 11 月 27 日

1. 今天遇到的坑：绑定 clear 方法不执行，原因：claer 是 JavaScript 的关键字，换个方法名即可；其实关键字这块理论早就涉及，但是没运用到实际场景就忘了，值得反思

### 2019 年 11 月 11 日

1. vue-cli2 的本地跨域代理 2019 年 10 月 22 日 讨论过。vue-cli3 下该如何操作呢？它并没有暴露 webpack 的配置文件，此时我们可以在 vue.config.js 中配置 devServer 的 proxy

### 2019 年 11 月 1 日

1. 今天排查出了困扰许久多问题，明明在自己的目录下，npm 竟然 permission denied。网上查阅了许多都不能改变，给文件夹赋权限等。后面发现是自己蠢了，在/usr/local/lib 里的全局依赖全都属于一个‘777’的用户。原来是赋 777 权限的时候命令错了导致把全局依赖的所属用户给了‘777’这个用户，而且命令错了，只有‘777’有 rwx 的权限，其他用户没有 w 的权限导致了这场闹剧。（我太难了

### 2019 年 10 月 30 日

1. Img 路径如果用相对路径，如果以后换了当前页面的路径，将会是灾难性的难维护，解决方法可以如下

```html
<img src="~assets/images/xxx.png" />
```

### 2019 年 10 月 22 日

1. vue-cli2 本地处理跨域 conf/index.js 的 proxyTable 里定义

```javascript
proxyTable: {
  '/api': { // 自定义host名
    target:'http://目标地址’,
    changeOrigin:true, //允许跨域
    pathRewrite:{
      '^/api': '' // 自定义的名字需要处理掉
    }
  }
}
```

### 2019 年 10 月 16 日

1. 原生 input 标签，当拼写汉字但汉字还未填充到文本框（选词中）时就会触发 input 事件，这并不是我们想要的。实际上已经有 api 可以解决这个问题：compositionstart、compositionend，配合操作锁变量

```javascript
<input id="input" type="text" />;

var lock = true;
var input = document.getElementById("input");
input.addEventListener("compositionstart", () => {
  lock = false;
});

input.addEventListener("compositionend", () => {
  lock = true;
});

input.addEventListener("input", () => {
  setTimeout(function () {
    // 为什么需要加定时器，为了改变事件流，让 lock 为准确值
    if (lock) {
      // ...
    }
  }, 0);
});
```

### 2019 年 10 月 14 日

1. 正则需要变量来传参又需要其他规则如^、\$怎么办，利用 new RegExp('^' + 参数变量)
2. nrm 是 npm 镜像源管理工具，可以切换/添加/删除 npm 的源，可用于私有的镜像源

### 2019 年 9 月 12 日

1. RegExp.test(str) 返回布尔值
2. str.match(RegExp) 返回匹配正确的数组

### 2019 年 9 月 6 日

1. go2shell 可以在当前路径启动终端，自带的终端只能在根目录启动

### 2019 年 8 月 14 日

1. axios 有取消请求的 api, 名为 cancelToken, 原生的话是 abort()这个方法, 原理是 promise 的 resolve 赋值给外部变量, 从而获取控制权

```JavaScript
// 1. 原生使用方法
var currentAjax = null;
$('.get-ajax').click(() => {
	currentAjax = $.ajax({
		...,
		error: function (err) { console.log('fail!'); }
	});
});
$('.cancel').click(() => {
	if(currentAjax) currentAjax.abort();
});

// click '.cancel' btn -> 'fail!'

// 2. axios.CancelToken
let CancelToken = axios.CancelToken;
let me = this;
axios.get(url, {
	cancelToken: new CancelToken(cancelFn => {
		// 达到某些条件
		cancelFn();
	});
}).then().catch();
```

### 2019 年 8 月 5 日

1. animation 是可以暂停的

```css
div:hover {
  animation-play-state: paused;
}
```

### 2019 年 7 月 10 日

1. el-table-column 条件渲染报错: h.\$scopedSlots.default is not a function. 原因是因为 Vue 的渲染优化机制, 相同标签会被复用, 给标签加 key 即可.

### 2019 年 7 月 3 日

1. 一些不常用的 vue 指令

```JavaScript
<!-- v-for 可以渲染对象 -->
<div v-for="(value, keyName, index) in object">
	{{index}}.{{keyName}}:{{value}}
</div>

<!-- v-pre: 跳过这个元素和它的子元素的编译过程 -->
<span v-pre>{{ 这里的内容不会被编译 }}</span>

<!-- v-once: 只渲染一次 -->
<p v-once>{{msg}}</p>  //msg不会改变
<p>{{msg}}</p> // msg会不断变化
```

### 2019 年 7 月 1 日

1. 利用 a 标签解析 url

```JavaScript
function parseUrl(url) {
	var a = document.createElement('a');
	a.href = url;
	return {
		host: a.hostname,
		port: a.port,
		pathname: a.pathname,
		query: a.search,
		hash: a.hash.replace('#', ''),
		params: (function () {
			var ret = {},
				seg = a.search.replace(/^\?/, '').split('&'),
				len = seg.length, i = 0, s;
			for (; i < len; i++) {
				if (!seg[i]) { continue; }
				s = seg[i].split('=');
				ret[s[0]] = s[1];
			}
			return ret;
		})()
	};
}
```

2. 下述汉字排序可能遇到的问题: 多音字汉字可能排序错误, 如厦(sha)门

### 2019 年 6 月 12 日

1. 汉字数据按字母排序

```JavaScript
const arr = ['福建', '广东', '北京']
arr.sort((a, b) => a.localeCompare(b, 'zh-Hans-CN', { sensitivity: 'accent' }))
// arr = ['北京', '福建', '广东'] 该例子为a-z正序, 倒叙改变a,b位置即可

// 后发现可简写成
arr.sort((a, b) => a.localeCompare(b))
// 可能是根据当前地区判断了国家'zh-Hans-CN'
```

2. 举一反三, js 都有汉字按字母排序了, 按笔画排序会有吗? 答案是没有, 找了半天, 只有大佬造好了的轮子

### 2019 年 3 月 21 日

1. 预编译: 变量和函数同名 js 是怎么处理的

```JavaScript
console.log(fn);
// 1.
function fn () { console.log('function'); }
var fn = 'string';
// 2.
var fn = 'string';
function fn () { console.log('function'); }

// 答案都是打印出fn函数, 会预编译成如下代码
var fn; // 函数变量提升
function fn () { ... }
console.log(fn); // 变量fn被函数fn覆盖

fn = 'string';
```

### 2019 年 3 月 15 日

1. npm 版本号 '~' 和 '^'的区别

```JavaScript
~: 会匹配最近的小版本依赖包，比如~1.2.3会匹配所有1.2.x版本，但是不包括1.3.0
^: 会匹配最新的大版本依赖包，比如^1.2.3会匹配所有1.x.x的包，包括1.3.0，但是不包括2.0.0
```

### 2019 年 3 月 12 日

1. 数字金额千分位格式化可以用 Number.prototype.toLocaleString()实现

```JavaScript
var num = 123456789;
num.toLocaleString(); // 123,456,789

// 缺点是会四舍五入千分位后的的值
var num2 = 123456789.987654321;
num2.toLocaleString(); // 123,456,789.988
```

2. JSON.parse(JSON.stringify(Object))会把 undefined, symbol, function 类型过滤掉, 且 date 类型会转成字符串类型

### 2019 年 3 月 7 日

1. 饿了么组件的@input 事件, @change 事件, 要传第二个参数, 就需要获取改变的值(第一个参数), 可用\$event 来当第一个参数.

### 2019 年 3 月 5 日

1. Vue 中计算属性 computed 默认是 getter 方法, 没有默认值. 当遇到校验需要给定默认值的类型时, 会报错, 可以用以下来

```JavaScript
computed: {
	xxx () {
		get () {
			// 原来的逻辑
		},
		default: [] // 这里定义默认值
	}
}
```

### 2019 年 2 月 13 日

1. 计算月份总天数 moment 有个 daysInMonth()方法, 十分便捷. 以前我是用下个月的当天减去这个月的当天获得月份总天数: moment().diff(moment().add(1, "M"), 'days')

### 2018 年 11 月 12 日

1. Node 的 path.resolve(), path.join(): 拼接参数; \_\_dirname 的意思: 当前文件的路径; process 是全局变量, 不用 require 引入

### 2018 年 8 月 7 日

1. 微信支付接口在 web 调试工具不支持, 如果报"没有此 SDK 或暂不支持此 SDK 模拟"的错, 千万不要慌, 到手机去调试吧.

### 2018 年 8 月 3 日

1. 获取时间戳

```JavaScript
const a = new Date();
// 1. Date.parse() 默认末尾三位数是0.
Date.parse(a); // 1533268648000
// 2. date.getTime()
a.getTime(); // 1533268648342
// 3. date.valueOf()
a.valueOf(); // 1533268648342
// 4. + date 推荐
+a; // 1533268648342
```

### 2018 年 7 月 2 日

1. vue 中 style 的 scoped 属性, 当存在这个属性时, 里面的 css 样式只作用于当前组件, 可以保证组件间样式不互相污染. 但是引用第三方组件时需要修改第三方组件样式, 在 scoped 里就需要用到穿透

```css
外层 >>> 第三方组件 {
  样式
}

// 也可以多写个没有scoped属性的style, 即一个组件两个style
<style scoped>
</style>

<style>
// 修改第三方样式
</style>
```

### 2018 年 5 月 9 日

1. vue 的$refs, 如果要修改样式, 在ios10下有bug. 只能赋值$refs.xxx.style 里面有的属性, 比如 width, height 都是没有的, 给这些赋值不会生效

### 2018 年 5 月 5 日

1. scoped 里的样式, 如果你需要用到 calc 计算属性, 包含 em, rem, 是不生效的. 需要在全局写, 或者在行内样式写.

### 2018 年 5 月 4 日

1. vue 报错 Maximum call stack size exceeded, 翻译过来就是栈溢出, 可能是递归死循环. 我这里的情况是因为\$logger 放进计算属性, 导致报错.

### 2018 年 4 月 27 日

1. package.json 里的 script, 不能运行报错, NPM err 一堆, 不要着急, 可能是环境不一样, mac 环境如"NODE_ENV=production node build/build.js" 语句间不用逻辑与, windows 环境下如果这样写, 会报错, "set NODE_ENV=production && node build/build.js", 即可

### 2018 年 4 月 16 日

1. 忘记切分支, 在 dev 修改代码, 又不想让代码付诸东流怎么办. 先 git stash 保存起来, 再切自己分支, 然后 git stash pop 即可.

### 2018 年 4 月 15 日

1. live(), die()是 jq 低版本的方法, 从 1.9 开始用 on(), off()取代.

### 2018 年 4 月 12 日

1. \$nextTice()如果在方法里使用, 好像会执行两次? 待解决. 比如饿了么的 resetFields, 会执行两次.
2. stringify 会把参数变成字符串, 比如你需要传一个数组, 但是你 stringify 后, 数组变成字符串, 请求就会报错.
3. mounted 和 created 区别, mounted 是在 dom 渲染后加载.

### 2018 年 4 月 10 日

1. watch 也能 watch 到\$route.params 的属性变化

### 2018 年 4 月 3 日

1. 子组件给父组件传值, 但是父组件可能有多个子组件, 因此需要索引. 可以把索引传给子组件, 然后子组件再 emit 一个对象出来, 但显得臃肿麻烦. 第二种做法是子组件正常传值, 父组件 @change="onChange($event, index)", 这里的$event 是子组件传过来的值, index 则是我们需要的正常索引.
2. 当父组件给子组件传值时, 如果是字符串 那直接 title="字符串", 如果是变量, 就:title="变量".(element ui)

### 2018 年 3 月 28 日

1. -S 是 --save， -D 是 --save-dev

```javascript
npm i vue -S
```

2. style scoped 属性. 只影响 style 标签的父元素和它所有的后代元素. 如果该组件大量运用 不建议写

### 2018 年 3 月 23 日

MVC MVP MVVM

```javascript
M数据保存 V用户界面 C业务逻辑
通信方式 V->C->M->V
1.View 传送指令到 Controller
2.Controller 完成业务逻辑后，要求 Model 改变状态
3.Model 将新的数据发送到 View，用户得到反馈

M数据保存 V用户界面 P业务逻辑
通信方式 V<->P<->M
1.双向通讯
2.V和M不发生联系, 都通过P传递

M数据保存 V用户界面 VM与V双向绑定
通信方式 V<->VM<->M
1.V变动直接反映在VM上, 反之也是.
```

### 2018 年 3 月 20 日

1. es7 includes 用法

```JavaScript
// 两个参数, 第一个参数是需要匹配的值, 第二个可选参数是起始位置
[1,2,3].includes(3) // true
[1,2,3].includes(4) // false
[1,2, NaN].includes(NaN) // true

[1,2,3].includes(3, 3) // false
[1,2,3].includes(3, -1) // true 如果第二个参数负值小于总长度, 则从0开始索引

inlcudes判断NaN是indexOf所没有的功能
```

### 2018 年 3 月 15 日

1. js 是静态作用域. 函数的作用域在函数定义时决定, 而不是调用时决定

```JavaScript
// 静态作用域
var value = 1;

function foo() {
  console.log(value);
}

function bar() {
  var value = 2;
  foo();
}

bar(); // 1
```

2. js 进入执行上下文时，首先会处理函数声明，其次会处理变量声明，如果如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。

```JavaScript
console.log(foo); // 会打印函数 而不是undefined

function foo(){
  console.log("foo");
}

var foo = 1;
```

3. 什么是闭包? 闭包 = 函数 + 函数能够访问的自由变量.
4. 什么是自由变量? 指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。

```JavaScript
var a = 1;

function foo() {
  console.log(a);
}

foo();
// a既不是foo函数的局部变量, 也不是foo函数的参数. a是自由变量
```

5. 函数参数的传递方式

```JavaScript
// 如果是基本类型, 按值传递
var value = 1;
function foo(v) {
  v = 2;
  console.log(v); //2
}
foo(value);
console.log(value) // 1

// 如果是引用类型, 引用传递
var obj = {
  value: 1
};
function foo(o) {
  o.value = 2;
  console.log(o.value); //2
}
foo(obj);
console.log(obj.value) // 2

// 如果是传递引用类型, 但是将该参数完全修改而不是修改其属性值, 共享传递
var obj = {
    value: 1
};
function foo(o) {
  o = 2;
  console.log(o); //2
}
foo(obj);
console.log(obj.value) // 1 obj还是引用类型 而不是基本类型的数值2

foo(obj.value);
console.log(obj.value) // 2 按值传递
console.log(obj)       // { value: 2 }

// 注意： 按引用传递是传递对象的引用，而按共享传递是传递对象的引用的副本！
```

6. linux 中管道命令符|的作用. 把第一个命令的输出值当做第二个命令的输入值执行. 如 ls -al | more
7. jQuery 对象和 Dom 对象怎么互相转换?

```JavaScript
var $div = $('#div')
$div.innerHTML()   // 报错

// jQuery对象转Dom对象 方法1
var div = $div[0]  // div 是Dom对象
div.innerHTML()
// jQuery对象转Dom对象 方法2
var div = $div.get(0)

// Dom对象转jQuery对象
var div2 = document.getElementById('div2')
var $div2 = $(div2) // $div2 是jQuery对象
```

### 2018 年 3 月 10 日

1. async await 是干嘛的. async 用在 function 前头, 用来申明是异步方法, await 用于等待一个异步方法执行完成

```JavaScript
async function testAsync() {
  return 'hello'
}

testAsync() // 返回一个Promise对象
testAsync().then(resolve => {
  console.log(resolve)  // 'hello'
})

await testAsync()

// async await的诞生是因为Promise在步骤多时传递参数太麻烦
// await只能在async里
// async可以不要await  await必须要有async
```

### 2018 年 3 月 9 日

1. swiper 轮播插件. 滚动一张的宽度是按 container 算的, 比如宽 900 的容器, 里面有 5 张图片容器, 这样 swiper 给每个图片容器的宽度为 900/5=180px, 实际上我们希望图片容器有间距, 但是设置 margin 对 swiper 没用, 设 padding 图片容器多出空白又不好看.

```JavaScript
第一个想法: 我的解决方法, 比较笨, 在图片容器外面再包一层div, 这个div设置margin,
里面的图片容器可以按我们希望的宽度来, 这样每次滚动的宽度距离能确保和图片容器外层div一致.
第二个想法: padding + background-clip: content-box, 发现swiper给的宽度还是180, 并不会因为有padding而减少, 最后加上box-sizing, 成功, 比第一种想法便捷许多
第三个想法: 设置border + 透明宽度, 发现不行, 失败. 加上box-sizing, 成功!
```

### 2018 年 3 月 7 日

1. bind 和 call, apply 的区别

```JavaScript
var a = 'global'
var obj = {
  a: 'local',
  showA () {
    console.log(this.a)
  }
}

var otherObj = obj.showA
otherObj() // 'global'
otherObj.bind(obj) // showA () { ... }
otherObj.bind(obj)() // 'global'
otherObj.call(obj) // 'global'

// 有上述可知, bind后返回的是一个函数, 还需要再执行一次
```

2. npm run build 打包报错原因

```JavaScript
1.确保你的package.json有写 build 的脚本指令
2.要不你就是和我一样犯傻, 把build文件夹误以为是打包后的dist文件夹给删了 T T
```

### 2018 年 3 月 6 日

1. document.write()什么时候会覆盖页面, 什么时候不会覆盖. 众所周知, document.write 也可以用来延迟加载资源

```JavaScript
// 覆盖
window.onload = function () {
  document.write('cover')
}

// 不覆盖
window.onload = document.write('cover')

// 函数调用 调用时覆盖
function cover () {
  document.write('cover')
}
cover()  // 覆盖

// 综上, 函数调用会覆盖
```

2. Vue 在 2.0 已经抛弃了 ready()的生命周期, 可以用 mounted()代替.

### 2018 年 3 月 1 日

1. 当已经创建的实例用添加属性, 该属性并不能有响应式变化, 如下例子刚开始只渲染第一个 p 标签.

```JavaScript
<p>{{name}}</p>
<p>{{sex}}</p>

new vm = new Vue({
  ...
  data () {
    name: 'Psilo'
  },
  ...
})

vm.sex = 'man'
// 添加属性成功, 但是渲染无效.
// 查看后发现原因是因为name有setter和getter, 后添加的sex没有
// 解决方法 1
Vue.set(vm, 'sex', 'man')
// 解决方法 2
vm.$set(vm, 'sex', 'man')
```

2. v-for 也可以和 v-if 一样, 和 template 标签渲染多个元素
3. 组件注册两种方法, 一种局部 一种全局

```javascript
// 局部, 一种导入(假设为header) 一种当前作用域定义注册
var footer = {
  template: '<div>i am footer</div>'
}
new Vue({
  ...,
  components: {
    'v-header': header // 导入
    'v-footer': footer // 作用域注册 不常用
  },
  ...
})
// 全局
var footer = {
  template: '<div>i am footer</div>'
}
// 注意 一定要在new之前注册, 否则无效
Vue.component('v-footer', {
  footer
})
new Vue({
  ...
})
```

4. 一般来说只允许浮父组件向子组件传值(props), 称为 props 单向数据流, 为了防止子组件无意间改变父组件的状态
5. 子组件向父组件怎么传值? 自定义事件. 父组件里用 v-on:自定义事件名字='监听方法名'; 子组件在监听方法名里用 this.\$emit('自定义事件名字')
6. 非父子组件怎么通信

```JavaScript
// 可以使用一个空的Vue实例来做媒介
var bus = new Vue()

// 需要传递值的组件
bus.$emit('someMethods')

// 需要接受值的组件
bus.$on('someMethods', function (val) {
  // 监听
  // ...
})

// 情况复杂的话需要vuex状态管理
```

7. 插槽分发 slot 标签. 在设计组合使用的组件时, 内容分发 API 非常有用
8. \$refs 只在组件渲染完成后才填充, 只是直接操作的应急方案, 应当避免在模板或计算属性中使用
9. v-on 的修饰符

```javascript
// 事件修饰符
.stop // evnet.stopPropagation() v-on:click.stop='doThis' 阻止冒泡
.prevent // event.preventDefault 阻止默认行为
.capture // 事件捕获
.once // 执行一次
.self // event.target是当前元素才触发

注意修饰符的顺序也有影响:
@:click.self.prevent // 阻止自身元素默认行为
@:click.prevent.self // 阻止所有的点击

// 按键修饰符
@:keyup.13 = 'submit' // keyup且keyCode是13才触发
@.keyup.enter = 'submit' // 同理

.enter
.tab // Tab键, 当focus到视口外失效, 如最后一个元素
.delete (捕获“删除”和“退格”键)
.esc
.space
.up // ↑键
.down
.left
.right

// 系统修饰键
.ctrl
.alt
.shift
.meta // mac对应Command, windows对应左下微软标识键 win

@keyup.ctrl.67='something' // ctrl + c 复制时候触发事件

// 鼠标按键修饰符
.left
.right
.middle
```

### 2018 年 2 月 28 日

1. v-once 只渲染一次, 适合包含大量静态内容
2. \$watch()里不能用箭头函数, 因为箭头函数本身没有 this, 因此会导致 undefined
3. v-html 用法, 例如 data 有个属性包含 html 标签, 直接用双花括号渲染会原封不动将 html 标签渲染成字符串, v-html 会将 HTML 标签渲染成 html 标签. 但是不推荐用, 因为容易导致 xss 攻击
4. 在计算属性 computed 定义的方法和在 methods 里定义的方法有什么不同? computed 里的方法适合性能开销大的计算, 因为它会缓存起来, 如果相应变量不改变, 它就只会计算一次, 后续的调用从缓存拿; methods 每次都会重复算
5. v-if 也能给多个元素加, 和 template 标签配合即可. 最终的渲染结果不包括 template 标签

```html
<template v-if="condition">
  <p>hello</p>
  <p>world</p>
  <p>!!!!!</p>
</template>
```

6. v-show 不能与 v-else 一起用, 也不用给多个元素加
7. v-if 和 v-for 一起用, v-for 比 v-if 高优先权

### 2018 年 2 月 27 日

1. 想要 vue 的过渡 transition 组件有效, 必须和下列其一搭配

```css
1. v-if（条件渲染）
2. v-show（条件展示）
3. 动态组件
4. 在组建的根节点上，并且被vue实例DOM方法触发，如appendTo方法把组件添加到某个根节点上
```

2. transition 只改变 x 轴 y z 其中一轴, 但是却使用 translate3d? 原因是因为 translate3d 开启硬件加速, 让动画更流畅. 缺点是移动端更耗电

### 2018 年 2 月 25 日

1.改变 placeholder 颜色, 但是 pc 端独占. - -?

```css
input::-webkit-input-placeholder {
  color: ;
}

input::-moz-input-placeholder {
  ..;
}
/* 其他同理 */
```

### 2018 年 2 月 23 日

1. 移动端的 viewport 设置. 宽度是设备宽度, 缩放比例为 1, 最小和最大比例都为 1, 禁止用户缩放.

```html
<meta
  name="viewport"
  content="width=device-width,
                 initial-scale=1.0,
                 minimum-scale=1.0,
                 maximun-scale=1.0,
                 user-scalable=no"
/>
```

### 2018 年 2 月 22 日

1. css 样式推荐书写顺序, 参考国服第一切图仔

```css
css {
  content 属性
  Positioning Model 布局方式、位置，相关属性包括：position / top / right / bottom / left / z-index / display / float
  Box Model 盒模型，相关属性包括：width / height / padding / margin / border / overflow
  Typographic 文本排版，相关属性包括：font / line-height / text-align / word-wrap
  Visual 视觉外观，相关属性包括：color / background / list-style / transform / animation / transition
}
```

2. 尽量不使用!important 属性, 可以多写个类选择器覆盖, 避免后期维护麻烦. 顺带一提, min-height/width, max-height/width 都是!important 限制不了的.

### 2018 年 2 月 21 日

1. box-sizing 的初始化.

```css
/* 不推荐, 因为内联元素宽度auto, 无效 */
* {
  box-sizing: border-box;
}
/* 推荐 */
input,
textarea,
video,
img,
object {
  box-sizing: border-box;
}
```

### 2018 年 2 月 20 日

1. jquery 也可以使用 JavaScript 的 &&, 当两句语句用&&连在一起, 如果前一语句是 false, 如 length. 后一语句也不会执行.

### 2018 年 2 月 14 日

1. textarea 是不支持伪元素 before after. 因此聊天气泡尖角只能另寻方法. 比如外框 div.

### 2018 年 2 月 13 日

1. 生成占位图片可用(//iph.href.lu/width x(字母 x) height), 而且图片极小. eg:

```html
<!-- 生成头像占位符 -->
<img src="//iph.href.lu/30x30" style="border-radius: 50%;" />

<!-- 生成背景图片占位符 -->
<div style="background-image: url(//iph.href.lu/400x200)">
  <!-- 还可传参 -->
  text=[自定义文字, 默认宽x高] bg=[图片背景色, 默认ccc] fg=[文字颜色, 默认666]
  //iph.href.lu/300x200?text=占位图片&fg=000&bg=fff
</div>
```

### 2018 年 2 月 11 日

1. 改变水平流向的 css 属性. direction: rtl(right to left); direction: ltr(left to right); eg: 确认取消按钮居中, 桌面端确认在左边, 移动端确认键在右边, 就可以使用该属性, 不用去写两套, 不用去动 js, 用媒体查询直接写即可.

### 2018 年 2 月 10 日

1. 为了规避 submit 按钮 UI 很难保持与网站一致(说白就是 submit 按钮很丑), 需要使用 label 元素来移花接木.

```html
<input id="submitBtn" type="submit" />
<label class="btn" for="submitBtn">提交</label>

[type='submit'] { position: absolute; clip: rect(0 0 0 0); } .btn { 统一UI样式 }
```

2. cursor 是当下关键字属性值最多的 css 属性. 其默认值不是 default, 而是 auto, 在 iuput 框时候变成 text, 在带 href 的 a 标签变成 pointer.

```javascript
cursor: default; 默认状态下的光标.
cursor: none; 将鼠标隐藏, 如全屏的时候, 光标静止几秒不动, 设置成none.
cursor: help; 带问号的鼠标.
cursor: progress; 进行中的光标, 如loading.
cursor: wait; 没有光标, window7下显示一个动态的圆圈.
cursor: crosshair; 十字光标.
cursor: cell; 单元格光标, Excel里面的宽十字.
cursor: move; 示意可以移动的光标.
cursor: copy; 示意当前元素可以被复制.
cursor: not-allowed; 禁止的光标.
...

```

3. user-select: none; 设置了这个 css 属性后文本不能被选中.

### 2018 年 2 月 8 日

1. 元素不可见的多种选择.

```JavaScript
// (1) 同时不占据空间, 辅助设备无法访问, 同时不渲染, 可以使用script标签
<script type='text/html'>
  <img src='1.jpg'>
</script>

// (2) 同时不占据空间, 辅助设备无法访问, 但资源有加载, DOM可访问.
.dn {
  display: none;
}

// (3) 同时不占据空间, 辅助设备无法访问, 但是显示隐藏有transition淡入淡出效果.
.hidden {
  position: absulute;
  visibility: hidden;
}

// (4) 不能点击, 辅助设备无法访问, 但占据空间保留.
.vh {
  visibility: hidden;
}

// (5) 不能点击, 不占据空间, 但键盘可以访问
.clip {
  position: absolute;
  clip: rect(0 0 0 0);
}
.out {
  posiiton: relative;
  left: -999em;
}

// (6) 不能点击, 但占据空间, 键盘可访问
.lower {
  position: relative;
  z-index: -1;
}

// (7) 但可以点击, 不占据空间, 可以使用透明度
.opacity {
  position: absolute;
  opacity: 0;
  filter: Alpha(opacity=0);
}

// (8) 位置保留, 可以点击可以选择, 直接透明度变0
.opacity {
  opacity: 0.;
  filter: Alpha(opacity=0);
}
```

2. display 为 none 时背景图片资源的请求

```JavaScript
ff: 不加载, 甚至是父元素dn(display: none), 子元素的背景图片也不加载.
chrome, safari: 父元素dn, 不加载; 自身元素dn, 图片加载.
ie: 无论如何都加载.
```

3. h5 新增 hidden 的特性, 可以让元素天生 dn. eg:

```html
<div hidden>你看不到我~</div>
```

4. transition 不支持 css 属性 display, 但是却支持 visibility, 想要淡入淡出, 就使用 visibility. 我最近的一个项目就使用 visibility+transition 解决了 hover 时弹出下拉列表的烦恼. 用 display 的话, 每次 hover 都出现, 即使你只是鼠标经过.

### 2018 年 2 月 6 日

1. 下划线 text-decoration: underline 的问题, 当有中文的时候, 例如 '三, 金'等下边缘和下划线贴在一起, 文字显示难免模糊, 可以用 border-bottom 替代.

```css
a {
  text-decoration: none;
  border-bottom: 1px solid;
}
// 注意这里的border-color不要定死, 当hover字体颜色变化时, 这样border-bottom也就可以一起变化; 而且还可以加padding撑得更开;
// 再者还能用dashed等出现不同的下划线形状.
```

2. text-transform 字符大小写. text-transform: lowercase 全小写. 看起来鸡肋, 实则有用武之地. 如验证码的输入, 让键盘输入的字母都大写能避免用户不知道验证码大小写的问题.
3. rgb 颜色实际上还支持百分比, 100% = 255, 0% = 0. 不过需要统一格式, eg: rgb(100%, 0%, 20%) 生效; rbg(100%, 0, 20%) 失败;

### 2018 年 2 月 5 日

1. font 简写的话 font-size 和 font-family 都是必须的, 不用属性不生效, 但是想要简写的话, font-family 又很麻烦, 可以如下写 css

```css
.font {
  font: 30px/30px "a"; /* 输入不存在的字体, 这里是a字体 */
  font-family: inherit;
}
/* 这样可以快速定义行高和字体大小 */
```

2. 多种字体后缀名. eot, ie6-ie8 支持的唯一字体, 因此兼容低版本 ie 就需要; svg, 兼容 ios4.1 之前的版本, 现在几乎可以考虑舍弃; woff, web open font format, 专门为 web 开发设计的字体, 尺寸小, 加载快, Android4.4 后支持; woff2, 比 woff 尺寸更小的字体, 第一首选. Chrome 和 ff 支持的比较好; ttf, 老版本安卓支持
3. text-indent 只对第一行有效, 而且支持百分比属性值.
4. word-spacing 只对空格有效, 这里的空格包括 space, 换行符, Tab 等.
5. word-break 和 word-wrap 区别

```css
word-break: normal || break-all || keep-all
word-wrap: normal || break-word
/* 这里只对比break-all和break-word的区别 */
word-breal: break-all会将长单词切断. 行末尾不会留空白.
word-wrap: break-word, 如果有长单词在行末尾, 那在这长单词前断行, 行末尾会空一片出来
```

### 2018 年 2 月 3 日

1. 我们都知道 font-family 的属性值可以中文也可以英文, 微软雅黑等同于'Microsoft Yahei', 有空格的字体需要加上引号, 但最好都用英文, 避免乱码. 第二点就是其实 font-family 属性值不区分大小写, 可以直接用小写字母.
2. ch 单位, 与 em 等一样是长度单位, 1ch 表示阿拉伯数字 0 的宽度. 配合等宽字体能起奇效
3. font-weight, 我们有时候会发现属性值 200, 300, 800 好像并没有用, 只有 normal 和 bold 的渲染效果, 其实是因为机器缺少这些详细字体的字号, 所以渲染不出. OS X 系统中的'苹方'就能够渲染出来.

### 2018 年 2 月 1 日

1. font-size 与 ex em rem, ex 是字符 x 的高度, font-size 越大, ex 也就越大. 结合 vertical-align 使用. em, 一个字模的高度, 也是汉字的高度. rem, root em, em 是根据当前 font-size 计算, 布局中用 em 太麻烦, rem 只针对根元素的 font-size 变化, 布局利器.
2. font-size 支持长度, 百分比. 但是其实还支持关键字. font-size: smaller, larger, xx-large, large, medium 等. smaller 与 larger 在不同浏览器表现有差异.
3. 除了 text-indent 缩进隐藏外, 对于文本可以用 font-size:0 隐藏. 大家都知道浏览器对 font-size 最小值有限制, chrome 最小 12px, 设置 font-size: 10px; 还是会被渲染成 12px; font-size: 0.0001px 也是一样的, 但是 font-size:0 却是实实在在的 0.

### 2018 年 1 月 31 日

1. 裁剪属性 clip, 在 chrome 下仍占据空间, 即宽高数值都在, 在 ie 和 ff 下, 仅显示裁剪完的占据空间.
2. 相对定位应该保持最小化原则. 如 div 右上角定位一个图标

```html
// 不推荐
<div style="position: relative;">
  <img src="icon.png" style="position: absolute; right: 0; top: 0" />
  <p>内容</p>
  <p>内容</p>
  <p>内容</p>
</div>

// 推荐
<div>
  <div style="position: relative;">
    <img src="icon.png" style="position: absolute;right: 0;top: 0" />
  </div>
  <p>内容</p>
  <p>内容</p>
  <p>内容</p>
</div>
```

3. relative 对 fixed 并无效果. fixed 的相对定位元素只能是 html

### 2018 年 1 月 30 日

1. position 基于 padding-box 定位, 例如要把一个图标定位在右上, 如果父元素有 padding, 那么定位元素的 right 和 top 也要进行相应的负值, 这样维护起来并不方便, 可以考虑设置透明的 border, 这样如果图标位置要改变, 也只需修改定位元素的 css 属性即可.
2. 有 absolute 属性的元素, 实际上父元素的 text-align 对齐有效, 但并不是特别的对齐. 前提是这个定位元素起始是内联元素, 另外对 text-align 起作用的实际上是定位元素前面的一个空白节点.

### 2018 年 1 月 28 日

1. 设置了 position 属性, float 会失效, 原因是二者都能产生破坏流和包裹性, 且 position 更强大, 因此 float 属性失效; 第二点是 position 能产生包裹性, 那就意味着 display: inline-block 是多此一举, 大可不必写内联块属性这一句.

### 2018 年 1 月 26 日

1. clear 属性只有块元素有效, 而伪元素默认是内联的, 这也就是为什么清除浮动时用::after::before 的时候需要加上 displa: 块级.
2. 想完美去除浮动, 最好用 BFC, BFC 内部的元素不会影响到外部布局, 也就是绝对不可能发生 margin 垂直重叠的原因. 具体触发条件以前列出过了.
3. 文字溢出...效果, 需要三个 css 属性同时声明.

```css
.ell {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
```

### 2018 年 1 月 25 日

1. 因 float 而出现的高度崩塌才是正常现象, float 最早出现就是为了破坏文档流, 实现文字环绕效果, 但是目前主流都把 float 当做布局来用, 清除浮动也在所难免.
2. vertical-align 的属性值 sub super 和 html 标签 sub sup 显示效果差不多, 区别就是 html 标签会把 font-size 调小一号, 而 vertical-align 不会.

### 2018 年 1 月 23 日

1. vertical-align 属性值是支持数值百分比的, 甚至支持负值. 因此有时候 vertical-align: middle 并不是垂直居中的最好选择, 用 middle 只是起到类似'垂直居中'的效果而已. 笔者认为是幽灵空白节点存在导致不够居中
2. 能够基于 vertical-align 实现纯 css+html 的弹窗, 并且能永远在浏览器窗口居中的效果, 省去 js resize 和 offset 宽高定位的代码.
3. 另外 vertical-align 对块级元素无效.

### 2018 年 1 月 22 日

1. margin 和 padding 的百分比赋值不管是水平方向还是垂直方向, 都是针对宽度计算, 因为 height 的 auto 问题.
2. writing-mode 是个很有趣的 css 属性, 能让文档流垂直走向, 文字至右从左. 但是有些细节也会改变, 比如 margin 垂直方向合并.
3. 说到 margin 合并, 其一要注意的是父子元素的同方向 margin 垂直也会合并, 平常没发现这个现象, 是因为通常都会给父元素赋 padding 值, 或者父元素变成 bfc. 其二要注意块元素且是空标签自身的 margin-top, margin-bottom 也会合并

```JavaScript
p {
  margin 10px 0;
}

<p>第一行</p>
<p></p>
<p></p>
<p>第二行</p>
// 上下例子显示效果一致
<p>第一行</p>
<p>第二行</p>
```

### 2018 年 1 月 21 日

1. 每个单词首字母大写, 一句代码.

```javascript
const capitalizeEveryWord = (str) => str.replace(/\b[a-z]/g, (char) => char.toUpperCase());
capitalizeEveryWord("hello world!"); // Hello World
```

### 2018 年 1 月 19 日

1. css clip:rect(top, right, bottom, left)矩阵裁剪功能, 而且四个属性都基于左上角而言. 例如 clip: rect(0, 10px, 10px, 0), 表示只显示左上角 10px 的正方形. 只能作用于绝对定位或者 fixed 的盒子

### 2018 年 1 月 18 日

1. 利用 padding 结合 background-clip: content-box, 可以用单个标签制作出三横的图标效果. background-clip: content-box 可以将 padding 部分的背景致为透明;
2. 同理, 轮播图的小圆点也能通过这个属性制作.

### 2018 年 1 月 15 日

1. hover 要让图片背景变化, 如果图片的背景已经是白色该怎么办, 可以在图片套个父元素, 给父元素颜色然后修改图片透明度, hover 时再改变透明度比例就可以了, 算是小技巧

### 2018 年 1 月 12 日

1. 应对 height: 100%无效的方法, 原因是因为父元素 height 是 auto, 解决方法 html,body{ height: 100%; }.

### 2018 年 1 月 11 日

1. 图片或者小图标 hover 改变新图片图标, 可以用 content: url(新图标), 优点代码少, 缺点 hover 的新图标不能保存

### 2018 年 1 月 10 日

1. max-width 比!important 权值还大

### 2018 年 1 月 7 日

1. 模拟书籍的目录效果可以用 content 和 counter 的计数器, 非常实用

```css
body {
  counter-reset: title 0;
  counter-reset: subtitle 0;
}
h1:before {
  counter-increment: title;
  content: "Section " counter(title) ". ";
}
h2:before {
  counter-increment: subtitle;
  content: counter(title) "-" counter(subtitle) " ";
}
```

### 2018 年 1 月 6 日

```javascript
<input type='button' value='按钮'>
<button>按钮</button>
```

1. 上述两种按钮写法看起来无异, 可是 while-space 属性不同, input 当 value 多到超过容器宽度时, 并不会换行.

### 2018 年 1 月 3 日

1. 张鑫旭老师的 css 世界建议购买读几遍, 是一本好书, 不过好像都卖断货了.

### 2017 年 12 月 30 日

1. 统计字符串中字符出现的次数.

```JavaScript
var str = 'abacdcab';
var output = str.split('').reduce( (p, k) => (p[k]++ || (p[k] = 1), p), {} );
console.log(output); // {a: 2, b: 1, c: 2, d: 2};
```

### 2017 年 12 月 28 日

1. 普通空格&nbsp 比较常见, 但是除了这个还有两个比较实用的, &ensp 半个汉字宽度, &emsp 一个汉字宽度

### 2017 年 12 月 19 日

最近 hexo 写文章需要用到图片, 原本以为需要靠七牛云等来存储图片, 原来 hexo 早就支持了.

1. 首先根目录配置文件 \_config.yml 中有 post_asset_folder 设为 true
2. 根目录下 npm/cnpm install https://github.com/CodeFalling/hexo-asset-image --save
   安装完后发现放置文章的\_posts 文件夹中, 一旦你 new 一篇文章, 就会出现同名的文件夹, 只需把图片放进去, 用相对路径引用即可

### 2017 年 12 月 4 日

1. 让 img 变成黑白照片. 使用 filter:gragscale(100%). 常见还有 blur(px)模糊, opacity(%)透明度.
2. li 间隙边框. 可以使用.nav li:not(:last-child) { border-left: xxx } 来出去最后一个 li 的边框.
3. li 逗号分隔. ul li:not(:last-child)::after { content: ',' }
4. 继承 box-sizing

```css
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
```

5. 当 a 元素没有文本值，但 href 属性有链接的时候显示链接:

```css
a[href^="http"]:empty::before {
  content: attr(href);
}
```

6. transparent: 用来指定全透明色彩. eg: color: transparent; 浏览器显示空白.

### 2017 年 11 月 17 日

插入数组的不同方法性能对比

1. 向数组中插入元素, 能有几种方法?

```JavaScript
var arr = [1,2,3,4];
// 数组结尾添加元素
1. arr.push(n)最简单;     // 返回arr长度, 并且arr改变
2. arr[arr.length] = n;  // 返回n, arr改变
3. arr2 = arr.concat(n); // arr不变
从效率来说, 第3种是最吃性能的, 也就是最慢的; 而通常最先想到的push方法, 也不是最优的解决方法,
综上考虑采取第2种方法效率性能能快上不少, 在不同浏览器上都能快50%以上(safari浏览器除外)

// 数组头部添加元素
1. arr.unshift(n); // 原数组改变
2. [n].concat(arr); // 返回新数组, arr不变
令人意外的是unshift()方法比concat平均慢了一倍不止, 前提是长度够大, 怀疑是unshift方法让每一个元素的index后移引起的性能问题(safari浏览器除外)

// 数组中间添加元素
1. arr.splice(arr.length/2, 0, n); // arr改变, 返回空数组 arr = [1,2,n,3,4];
当元素是奇数时, arr = [1,2,3]; 上述语句执行后, arr => [1,n,2,3];
用splice是最优方案, 无脑用即可
```

### 2017 年 11 月 15 日

1. 打乱数组排序的技巧.

```JavaScript
var arr = [5, 345, -127, 1222, 866, -10, 400];
arr = arr.sort(function() {
  return Math.random() -  0.5
});
// 顺序打乱
```

### 2017 年 11 月 13 日

今天讨论 js 单线程的机制

1. 任务队列 task queue. js 是单线程的, 先执行一行一行的代码, 这属于同步任务, 后去任务队列运行里面的任务, 属异步操作, 只有主线程即同步任务空了, 才会去执行任务队列.
2. macrotask microtask. microtask: promise, Object.observe 等; macrotask: setTimeout setInterval 等. 值得注意的是整个 script 代码也是 macrotask
3. 具体的流程是, 先执行 macrotask(整个 script 代码), 同步代码运行完后有 microtask 就先执行, 没有 microtask 执行下一个 macrotask, 依次列推.

### 2017 年 11 月 2 日

1. arguments 并不是真正的数组, 它是一个实参对象. 每个实参对象都包含以数字为索引的一组元素以及 length 属性, 但它毕竟不是真正的数组, 可以理解成它是一个对象, 只是碰巧具有以数字为索引的属性. 在严格模式下不能给 arguments 赋值, 和使用 arguments 作为变量名.
2. caller, callee 属性. ECMAScript 标准规范规定 callee 属性指代当前正在执行的函数, caller 是非标准的, 指代调用当前正在执行的函数的函数. 通过 caller 可以访问调用栈. callee 在递归调用非常有用.
3. 宁愿程序在传入非法值时报错, 也不愿非法值导致程序在执行时报错.
4. 闭包. 作用域在函数定义时决定的.

```JavaScript
var scope = 'global scope';
function checkscope() {
  var scope = 'local scope';
  function f() { return scope; }
  return f;
}
checkscope()();   // 'local scope'
```

### 2017 年 10 月 31 日

1. toString()问题. 让我们来探索下 3.toString(), 3..toString(), 3...toString()的结果.

```javascript
3.toString();   // error
3..toString();  // '3'
3...toString(); // error

var a = 3;
a.toString();   // '3'
a..toString();  // error

// 上面看完是不是晕了, 其实在js中, (3.3), (3.), (.3)都是合法的数字, 3.toString()里的 . 到底是 (3.)还是方法调用? 结果是(3.),
// 因为编译从左到右, 所以 3. .toString()才是唯一不报错的那个. 当然我们可以加括号
(3).toString(); // '3'
```

### 2017 年 10 月 30 日

1. string 中 slice, substr, substring 方法区别. slice 两个参数(start, end), 返回开始和结束区域(不包含结束), 负数加上字符串总长度; substr 两个参数(start, length), 返回开始 index 到长度长度, 第二个参数(length)不支持负数; subtring 两个参数(start, end), 返回开始和结束区域(不包括结束 index, 如果第二个参数比第一个参数小, 会调转位置), 负数直接置零.

```JavaScript
var str = 'hello world';
str.slice(-3);     // rld
str.substr(-3);    // rld
str.substring(-3); // hello world

str.slice(4, 7);     // 'o w'
str.substr(4, 7);    // 'o world' 第二个参数7, 从索引4开始, 返回7个长度
str.substring(4, 7); // 'o w'

str.slice(3, -4);     // 'lo w'
str.substr(3, -4);    // '', 长度-4返回空字符串
str.substring(3, -4); // 'hel' -4置零, 变成str.substring(0, 3);
```

### 2017 年 10 月 28 日

1. 数组方法 reduce(), reduceRight(). 两个参数, 第一个是执行化简操作的函数, 第二个(可选)的参数是一个传递给函数的初始值, 当没有指定初始值时将使用数组的第一个元素作为其初始值. reduceRight()工作原理和 reduce()一致, 只是顺序是从右到左.

```JavaScript
var a = [1,2,3,4,5]
var sum = a.reduce(function(x,y){ return x+y;}, 0);      // 数组求和
var product = a.reduce(function(x,y){ return x*y; }, 1); // 数组求积
var max = a.reduce(function(x,y){ return (x>y)?x:y; });  // 求最大值, 初始值是1
```

2. 函数表达式也可以包含名称, 而且函数表达式适合用来定义只会用一次的函数.

```JavaScript
// 包含名称在递归的时候很有用
var f = function factorial(x) { if(x<=1) return 1; return factorial(x-1); }

// 函数表达式有时定义后立即调用
var tensquared = (function(x){ return x*x;}(10));
```

3. 函数调用 4 种, 作为函数, 作为方法, 作为构造函数, 通过 call()apply().

### 2017 年 10 月 22 日

1. es6: 用 let 命令声明，不会发生变量提升。如果区块中存在 let 和 const 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域(暂时性死区)。凡是在声明之前就使用这些变量，就会报错。
2. 字符串的扩展. 可以用反引号`标识,

```javascript
`There are <b>${basket.count}</b> items`;
```

省去+连接符的繁琐, 变量直接在\${}里填写即可.

3. 数值的扩展. 新增二进制和八进制的写法. 0b11 == 3, 0o11 == 9; 提供 Number.isFinite(), Number.isNaN().
4. 函数的扩展. 箭头函数有几个使用注意点

```javascript
（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
其实箭头函数内部没有自己的this，导致内部的this就是外层代码块的this。

（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}
```

5. 数组的扩展. Array.from 方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象; Array.of 方法用于将一组值，转换为数组。

```javascript
let arrayLike = {
  0: "a",
  1: "b",
  2: "c",
  length: 3
};
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

Array.from("hello"); // ['h', 'e', 'l', 'l', 'o']

let namesSet = new Set(["a", "b"]); // Set { "a", "b" }
Array.from(namesSet); // ['a', 'b']

Array.of(3, 11, 8); // [3,11,8]
Array.of(3); // [3]
Array.of(3).length; // 1
```

6. 对象的扩展. 属性的简洁表示法

```JavaScript
// 变量缩写
function f(x, y) {
  return {x, y};
}
// 等同于
function f(x, y) {
  return {x: x, y: y};
}

// 方法缩写
const o = {
  method() {
    return "Hello!";
  }
};
// 等同于
const o = {
  method: function() {
    return "Hello!";
  }
};
```

### 2017 年 10 月 18 日

1. parentNode, parentElement 区别. parentNode 是 W3C 标准, parentElement 只在 IE 中可用. 经测试后者也能在高级浏览器使用. parentNode 返回元素的 DOM 树中的父元素. nodeType 可以是多样的. 后者返回必须是元素节点, 否则返回 null.

```javascript
eg: document.body.parentNode.parentNode; // => #Document nodeType为9(Document);
document.body.parentElement.parentElement; // => null 因为nodeType !== 1(Element) 所以返回null;
```

### 2017 年 10 月 16 日

1. Array.join(), Array.concat(), Array.slice(), toString(), toLocaleString(), 都不会修改原数组.
2. Array.reverse(), Array.sort(), Array.splice(), push()pop() shift()unshift()会修改原数组.
3. es5 数组方法. forEach(), map(), filter()不会修改原数组.
4. 在空数组上调用时, every()返回 true, some()返回 false.

### 2017 年 10 月 15 日

1. 使用负数或非整数来索引数组, 数值转换为字符串, 字符串作为属性名来用; 使用非负整数的字符串, 它会被当做数组索引; 使用浮点数和一个整数相等时的情况下, 也会被当成数组索引.

```JavaScript
var arr = [];
// 负数非整数
arr[-1.23] = 1; // 创建"-1.23"的属性

// 非负整数字符串
arr["5"] = 5; // arr[5] => 5

// 浮点数
arr[1.000] // 和a[1]等价
```

2. 稀疏数组, 就是 length 大于元素实际的个数. 当省略数组直接量中的值时, 所得的数组是稀疏数组.
3. 设置 length 属性为一个小于当前长度的非负整数 n 时, 数组中那些索引值大于 n 的元素都将被删除.

```JavaScript
a = [1, 2, 3];
a.length = 0;
a // []
a.length = 5;
a // [undefined x 5]
```

4. 数组元素添加删除. delete 并不影响数组长度, 可是会致使数组变为稀疏数组.

```javascript
a = [1, 2, 3];
delete a[1];
1 in a; // false: 数组索引1并未在数组中定义
a.length; // => 3
```

5. pop(), shift()方法会删除数组元素并返回被删的值. 注意的是 pop()方法会使 length-1, shift()方法将所有元素的索引降 1, 这是和 delete 不同的地方.

### 2017 年 10 月 13 日

1. 属性特性. 数据属性的 4 个特性: value, writable, enumerable, configurable. 存储器 4 个特性: get, set, enumearble, configurable. 可以用 Object.defineProperty(对象, "属性", {4 个特性})来定义一个对象的属性. 不写的话默认 false 或 undefined

```javascript
var o = {};
// 可配置性configurable是true就可以修改4个特性, 但是要注意的是, 修改configurable为false后再也不能修改了
Object.defindProperty(o, 'x', {value:1, writable:true, configurable:true}); // enumerable没写默认false.

// x属性存在但不可枚举
o.x; // => 1
Object.keys(o) // => []

// 对属性x做修改, 让它只读
Object.defindProperty(o, 'x', {writable: false});
o.x = 2; // 操作失败但不报错, 严格模式下抛出TypeError.
o.x; // => 1

// 修改可配置性
Object.defindProperty(o, 'x', {configurable: false});
Object.defindProperty(o, 'x', {configurable: true}); // error: Uncaught TypeError: Cannot redefine property: x

// 存储器
Object.defineProperty(o,"b",{
  set:function(newValue){
    console.log("你要赋值给我,我的新值是"+newValue)
  },
  get:function(){
    console.log("你取我的值")
      return 2;
  }
})
o.b = 1; // 控制台输出"你要赋值给我,我的新值是1"
o.b; // 控制台输出'你取我的值', 返回2

// 对多个属性同时定义可用
Object.defindProperties(o, {
  x: {value:1},
  b: {set: function()...}
})
```

2. [,,]是两个元素而不是三个, 原因是数组直接量的语法允许有可选的结尾的逗号.

### 2017 年 10 月 12 日

1. continue 在 while 语句和 for 语句里作用不一样. while 语句的 increment 自增自减语句和执行语句在一起, continue 跳过也会跳过而陷入死循环. for 语句的 continue 跳出当前执行语句, 然后再进行 increment 自增自减.
2. 严格模式下, 禁止使用 with 语句. 调用的函数(不是方法)中的 this 不是全局对象而是 undefined.
3. delete 运算符是断开属性和宿主对象的联系, 而不会去操作属性中的属性. a={p:{x:1}}; b=a.p; delete a.p; b.x 的值依然为 1; 其二 delete 只能删除自有属性, 不能删除继承属性.

### 2017 年 10 月 11 日

1. 不考虑兼容性的情况下, 觉得滚动条太丑, 可以用 css3 自定义滚动条样式. -webkit-scrollbar, 纯 css 实现滚动条, 并且支持鼠标滑轮, 鼠标点击等操作.

```css
::-webkit-scrollbar /* 整体部分 常用 */
::-webkit-scrollbar-button /* 两端按钮 */
::-webkit-scrollbar-track /* 外层轨道 常用 */
::-webkit-scrollbar-track-piece /* 内层轨道 */
::-webkit-scrollbar-thumb /* 滚动滑块 常用 */
::-webkit-scrollbar-corner /* 边角 */

```

### 2017 年 10 月 10 日

1. switch 语句里的 case 和表达式匹配是用全等'==='来衡量, 换句话说, 表达式和 case 的匹配并不会做任何类型转换.
2. for 语句. for(initialize; test; increment) statement; 循环中三个表达式中的任何一个都可以忽略, 但是两个分号必不可少. for(;;).
3. break 语句带不带标签, 它的控制权都无法越过函数的边界. 对于一条带标签的函数定义语句来说, 不能从函数内部通过这个标签来跳转到函数外部.

### 2017 年 10 月 7 日

1. 当有运算符副作用时, i=i+1 和++i 就不等价了. eg: data[i++] += 2; data[i++] = data[i++] + 2;
2. eval()直接调用时, 会在调用它的上下文作用域内执行; 其他的间接调用则使用全局对象作为其上下文作用域, 并且无法读写局部变量和函数.

```JavaScript
var geval = eval;
var x = 'global',
    y = 'global';
function f() {
  var x = 'local';
  eval('x += "changed";');
  return x;
}
function g() {
  var y = 'local';
  geval('y += "changed";');
  return y;
}

console.log(f(), x); // 直接调用, 改变局部变量. 输出'localchanged global'
console.log(g(), y); // 间接调用, 改变全局变量. 输出'local globalchanged'
```

3. typeof(i) 等价 typeof i;
4. delete 运算符不能删除内置核心和客户端属性, 不能删除用户 var 出来的变量和用户通过 function 定义的函数;

```javascript
var a = 1;
b = 1;
delete a; // false 删除失败返回false, 严格模式下还会返回类型错误.
delete b; // true
a; // 1
window.a; // 1
b; // undefined
window.b; // undefined
```

5. 逗号运算符返回右操作数. eg: i=0,j=1,k=2; 返回 2;

### 2017 年 10 月 6 日

1. lval. left-value 缩写, 左值指表达式只能出现在赋值运算符的左侧.
2. 三元运算符顺序, 从右至左. eg: q = a ? b : c ? d : e ? f : g; // => q = a ? b : (c ? d : (e ? f : g))
3. y = x + z. 如果表达式 x 中的一个变量自增 1, 这个变量在表达式 z 中使用, 那么实际上是先计算出了 x 的值在计算 z 的值. eg: b = (a++) + a. 假设 a 的值是 1, b = 3;
4. 字符串比较是区分大小写的. 所有大写的 ASCII 字母都小于小写的 ASCII 字母 'Zoo' < 'asd' // => true
5. 加号运算发更偏爱字符串, 有一个是字符串的话, 则进行字符串比较; 比较运算符更偏爱数字, 只有当两个操作数是字符串时, 才会进行字符串比较.

```javascript
var date = new Date(),
  fun = function () {
    return 1;
  },
  arr = [1, 2, 3],
  reg = /\d+/g,
  date2,
  fun2,
  arr2,
  reg2;

date2 = date + 1; // typeof date2 => String 下面同
fun2 = fun + 1; // String
arr2 = arr + 1; // String
reg2 = reg + 1; // String

date2 = date - 1; // Number
fun2 = fun - 1; // Number
arr2 = arr - 1; // Number
reg2 = reg - 1; // Number

"11" < 2; // 11 < 2 false
"one" > 3; // NaN > 3 false 只要有NaN就是false
```

### 2017 年 10 月 3 日

1. 包装对象.

```JavaScript
var s = 'test';
s.len = 4;
var t = s.len // => undefined
// 第二行代码创建一个临时字符串对象, 并给其len属性赋值为4, 随即销毁这个对象.
// 这种存取字符串, 数字, 布尔值的属性时创建的临时对象称作包装对象.
// 用来区分字符串值字符串对象, 数字数值对象, 布尔值布尔对象.
// 可以通过String() Number() Boolean()构造函数来显式创建包装对象.
```

2. 原始值: 任何方法都无法更改. 原始值的比较是值的比较. 对象的比较并非值的比较, 即使两个对象包含同样的属性相同的值也不会相等.
3. 非空非数字的字符串, 类型转换成 Number 类型都是 NaN. eg: 'n' 'one'
4. 一些隐式类型转换.

```JavaScript
x + '' // 等价于String(x)
+x // 等价于Number(x) 之前提到的一元运算符
!!x // 等价于Boolean(x)
```

5. 除了常见的 toFixed(), 还有 toExponential()使用指数计数法将数字转换为指数形式的字符串, 小数点后的位数由参数指定, 即总的有效数字 = 参数 + 1; toPrecision()根据指定的有效数字位数将数字转换成字符串, 如果有效数字的位数少于数字整数部分的位数, 则转换成指数形式. 三种方法都会适当地进行四舍五入或填充 0.

```JavaScript
var n = 123456.789
n.toFixed(5) // "123456.78900"
n.toExponential(1) // "1.2e+5"
n.toExponential(3) // "1.235e+5"
n.toPrecision(4) // "1.235e+5"
n.toPrecision(7) // "123456.8"
n.toPrecision(10) // "123456.7890"
```

6. 对象转换为原始值. 第一个是 toString(), 第二个是 valueOf().

```JavaScript
对象到字符串的转换:
1. 如果对象具有toString(), 则调用这个方法, 如果它返回一个原始值, JavaScript将对这个值转换为字符串,
   并返回这个字符串结果.
2. 如果对象没有toString(), 或者这个方法并不会返回一个原始值, 那么JavaScript会调用valueOf()方法. 如
   果存在这个方法, 则调用它, 如果返回值是原始值, JavaScript将这个值转换为字符串, 并返回这个字符串结果.
3. 否则, JavaScript会抛出一个类型错误异常
对象到数字的转换: 将上述1, 2点反转一下.
```

### 2017 年 10 月 2 日

1. 出于可移植性和易于书写的考虑, 一般只是用字母和数字来定义标识符(变量名), 但是 js 是允许标识符出现 Unicode 字符的, 意味着可以使用非英语语言或数字符号来书写标识符. eg: var π = 3.14;
2. js 字符串都是固定不变的, replace() toUpperCase()等方法都是返回新数组.
3. 涉及++和--运算符时, 如果想将其作为后缀表达式, 必须和变量在同一行.

```JavaScript
x
++
y
// js解释器将解析为x; ++y;
x
++;
y
// 报错 SyntaxError

```

### 2017 年 9 月 29 日

1. vscode 插件修改个人配置, 到 C 盘下所在用户文件夹下找到.vscode/extensions/插件所在文件夹, 找到相关文件修改, 重启 vscode 即可. 比如 fileheader, 只需要修改 package.json 里的 Author.
2. 犀牛书的直接量和高程里的字面量是一个东西.

```javascript
赤裸裸直接使用的数据, 没有进行封装;
var test = "hello world";
// "hello world" 为字符串字面量
```

### 2017 年 9 月 26 日

1. visibility 属性, 默认 visible, 设为 hidden 元素不可见. 与 opacity 的区别: 都占据原本的空间, 区别是 opacity 会响应用户交互, visibility 不会. 如绑定事件 click, 点击 opacity 的元素还是会起作用.

### 2017 年 9 月 25 日

1. Math.min()比 Math.max()大. Math.min() > Math.max() // true

```javascript
Math.min()不传参数就是返回 Infinity, Math.max()不传参数就是返回 -Infinity
不好理解的话就换个算法的角度来看, 如果我们写方法返回最大值, 初始值(max)应该设什么呢?
function miniumn(arr) {
  let max = 0; // <- -Infinity
  arr.forEach(item => {
    if (item > max) {
      max = item;
    }
  })
  return max;
}
```

2. 正则表达式字面一致也不相等
3. 函数名称不可改变
4. 写出最简单的去重方式

```JavaScript
// es6的new Set()方法, 不过一般面试官肯定不会只满意这个
let arr = [0, 1, 2, 1, 0];
console.log(new Set(arr)); // => Set {0, 1, 2}

// es5 filter过滤器
arr.filter(function(elem, index, Array) {
  return index === Array.indexOf(elem)
})
```

### 2017 年 9 月 16 日

1. 父元素透明不影响子元素. 高级浏览器下用 opacity 后, 子元素会一起变透明, 显然是不行的, 这时候可以用 rbga 来实现; ie6, 7 ,8, 9 浏览器下用专属的 filter:Alpha(opacity=x), 再将子元素设为相对定位, 可以让子元素不透明. 除此之外还可以用两个 div 来重叠, 设置 z-index 即可.

```html
<div>
  <p>text</p>
</div>
```

2. 父元素模糊不影响子元素. 通过伪类实现, ie 下也可以通过方法支持伪类从而实现.

```css
.test {
  width: 420px;
  height: 420px;
}
/* 或者after */
.test::before {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  content: "";

  -webkit-filter: blur(10px);
  -moz-filter: blur(10px);
  -ms-filter: blur(10px);
  filter: blur(10px);
  z-index: -1; /* z-index负值使子元素可见 */
  background: url("") no-repeat;
  background-size: cover;
  overflow: hidden; /* 边缘是否模糊, hidden为不模糊 */
}
```

### 2017 年 9 月 15 日

1. 前序遍历: 先遍历根结点, 然后遍历左子树, 最后遍历右子树. 中序遍历: 先遍历左子树, 然后遍历根结点, 最后遍历右子树. 后序遍历: 先遍历左子树, 然后遍历右子树,最后遍历根节点.

```javascript
前序: 根左右
中序: 左根右
后序: 左右根

已知前序后序, 不能确定唯一二叉树, 不能确定左右子节点
已知前序中序/中序后序, 可以确认唯一二叉树: 通过前序第一位或者后序最后一位确认根节点, 在通过中序判断根节点的左右子节点
```

### 2017 年 9 月 14 日

1. 解耦 HTML/JavaScript. HTML 和 JavaScript 过于紧密耦合, 出现错误的时候就要判断错误是在 HTML 还是在 JavaScript 部分, 第一种情况是 HTML 中用 script 元素包含内联代码; 第二种情况就是 JavaScript 中用 innerHTML 包含 html 代码. 行为和数据需要保持分离. HTML 和 JavaScript 解耦可以在调试过程中节省时间, 更加容易确定错误的来源和减轻维护的额难度.
2. 解耦 CSS/JavaScript. 在 JavaScript 中常常会用到 element.style.color = 'red';这样来更改某些样式. 实际上让 CSS 和 JavaScript 完全解耦是不可能的, 不过我们可以将大部分样式信息留在 CSS 中, 通过动态定义类来最小程度上减轻耦合紧密度, elment.className = 'text-color';
3. 解耦应用逻辑/事件处理程序. 将应用逻辑 validateValue 从事件处理程序汇总分离出来有几个好处, 第一不依赖事件处理, 只接受一个值, 后续如果有事件引发同样的逻辑, 可以调用它; validateValue 更容易被触发, 在事件处理程序中如果发生错误, 你需要判断两边, 但分离后你手动传值就能判断出应用逻辑是否有错. 几条原则: 勿将 event 对象传给其他方法, 只传来自 event 对象中所需的数据; 任何可以在应用层面的动作都应该可以在不执行任何事件处理程序的情况下运行; 任何事件处理程序都应该处理事件, 然后将处理转交给应用逻辑.

```JavaScript
    function handleKeyPress (event) {
      event = EventUtil.getEvent(event);
      if (event.keyCode == 13) {
        var target = EventUtil.getTarget(event);
        var value = 5 * parseInt(target.value);
        if (value > 10) {
          document.getElementById('error-msg').style.display = 'block';
        }
      }
    }
    ----------------------------------
    function validateValue (value) {
        value = 5 * parseInt(value);
        if (value > 10) {
          document.getElementById('error-msg').style.display = 'block';
        }
    }
    function handleKeyPress (event) {
      event = EventUtil.getEvent(event);
      if (event.keyCode == 13) {
        var targe = EventUtil.getTarget(event);
        validateValue(target.value);
      }
    }
```

### 2017 年 9 月 13 日

1. 离线检测 navigator.onLine 值为 true 表示设备能上网, 正常工作; false 表示设备离线, 执行离线状态时的任务. 实际上 HTML5 还定义了 online offline 两个事件, 对象都是 window. 在加载页面后用 navigator.onLine 获得初始状态, 然后靠这两个事件来检测应用是否变化.
2. 数据存储 HTTP Cookie, 也叫 cookie. 一些限制: cookie 绑定在特定的域名下, 无法被其他域访问; cookie 总个数有限制, 如 ie6 最多 20 个; cookie 容量不能超 4KB. cookie 由名称,值,域,路径,失效时间,安全标志构成. 服务器将上述发给浏览器, 而浏览器只能发键值给服务器,且都需要 URL 编码.
3. Web storage 存储机制 sessionStorage 和 globalStorage(被 localStorage 取代). 出现的原因是克服 cookie 的一些限制.

```javascript
二者区别:
// 存储大小
cookie: 一般不超过4k, 且数量只能20个左右; Web storage 容量能达到 5MB 或者更大.

// 数据有效期
cookie 一般由服务器生成, 可以设置失效时间; session 针对回话的小段数据存储, 即数据值保持到浏览器关闭. local 除非用户通过 js 清除或清除浏览器缓存, 会一直存在.

// 作用域
cookie 在所有同源窗口中共享
sessionStorage 同一个浏览器窗口共享
localStorage 所有同源窗口中共享

// 通信
cookie 携带在http请求中, cookie保存过多数据会造成性能问题
Web storage 只在客户端(浏览器)中保存

// 易用性
cookie 没有api, 需要用户自己进行封装
Web storage 有原生api可以调用 setItem/getItem/removeItem/clear()
```

### 2017 年 9 月 12 日

1. 函数返回值 return 和值之间不能换行, 不然返回 undefined. 2017 年 10 月 2 日补充, break, continue 也同理.

### 2017 年 9 月 11 日

1.  with try-catch eval 可以改变作用域链.
2.  Boolean([]); // => true, 只有 0, null, false, NaN, undefined, ""才会是 falst  
    Number([]); // => 0,  
    Number({}); // => NaN,  
    Number(false); // => 0  
    [] == false // => true,  
    {} == false // => false
    NaN == 0 // => false
    NaN == NaN // => false
3.  canvas 绘制矢量图, svg 绘制位图.
4.  1. A:IE6.0 的 div 的内嵌 div 可以把父级的高度撑大, 而 FireFox 不可以, 要自己设置高度;
    2. 当设置为三列布局时, IE6.0 的 float 宽度不能达到 100％, 而 FireFox 可以. 当设置为两列布局时, 两种浏览器都可以;
    3. FF 非 float 的 div 前面有同一父级的 float 的 div, 此 div 若有背景图, 要使用 clear: both, 才能显示背景图, 而 IE6.0 中不用使用 clear: both;
    4. 在[text-decoration:underline]的属性下, IE6.0 显示的下划线会比 FireFox 低一点. 在 FireFox 中, 部分笔画会在下划线的下面 1 个象素左右.
5.  非块级元素无法设宽高; float 会把浮动元素变成块级元素; 绝对定位脱离文档流. span height 继承 div 所以高为 200px 宽度 auto 由内容决定, i 脱离文档流, span 宽度为 0.

        <div style=”width:400px;height:200px;”>
            <span style=”float:left;width:auto;height:100%;”>
                <i style=”position:absolute;float:left;width:100px;height:50px;”>hello</i>
            </span>
        </div>

6.  BFC: 满足以下一项即可成为 BFC

```javascript
float: left | right;
position: fixed | absolute;
display: (inline - block) | (table - cell) | (table - caption) | flex | (inline - flex);
overflow: hidden | scroll | auto;
```

    用BFC来做什么:1.外边距折叠; 2.容器无高度包含浮动元素; 3.阻止文字环绕

### 2017 年 9 月 10 日

1. Flash 提供了 ExternalInterface 接口与 JavaScript 通信, ExternalInterface 有两个方法：call 和 addCallback. call 让 Flash 调用 js 里的方法, addCallback 是用来注册 flash 函数让 js 调用.
2. a:link {} a:visited {} a:hover {} a:active {} (固定顺序: LoVe HAte 记忆口诀 爱与恨). 其实不是固定的, 这个顺序的体验是最好的
3. json 字符串必须用双引号. stringify()把一个 javascript 对象序列化为 json 字符串, parse()把 json 字符串转为 JavaScript 对象. stringify 还能传两个可选参数, 第一个是过滤器, 可以是数组,函数. stringify 不传空格数是不包含空格字符和缩进的, 所以第二个参数是空格数(数值 最大为 10), 可以传非数值. parse()有一个可选参数, 是一个函数(还原函数).
4. 跨域解决方案 CORS, ie8 用 XDomainRequest 对象支持, 其他浏览器用 XHR 对象支持. 图像 ping 和 jsonp 也能解决跨域通信(均只能 GET).
5. 作用域安全的构造函数(可能漏写 new, 保证函数健壮), 惰性载入函数(不必每次执行 if 语句).
6. console.log(1+ +"2"+"2"); // 32 +"2" + => 一元运算符, 1+ +"2" 相当于 1+2.

### 2017 年 9 月 9 日

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

1. 上述题目答案是 0 1 别被 var i = 0 给迷惑, 这里考点是闭包的性质. 这里可以看成 var f1 = function(){document.write(i++);}; 闭包可以通过作用域链读取上层变量, 另一个重要的性质就是会把这些变量的值保存在内存中, 所以 f1()后 i = 1 保存在内存中.
2. console.log('Value is ' + (val != '0') ? 'define' : 'undefine'); 输出 define, 前面的'Value is'是障眼法, 实际上考察三目运算符和符号优先级, 加号+优先级比? :高, 所以无论 val 有无定义, ('Value is' + (...))一定是 true.
3. try-catch-finally, 如果代码包含 finally 语句, 无论是 try 还是 catch 的 return 语句都会被忽略. 因此有 finally 就不用写 catch 了, ie7 之前需要写 catch, finally 才会执行. => 2017 年 10 月 12 日更新, 当 try 块内某处发生异常, 调用 catch 内的代码逻辑. finally 块放置清理代码. 不论 try 是否抛出异常, finally 总会执行.

### 2017 年 9 月 1 日

1. html5 事件 contextmenu 可以自定义右键菜单. 通过事件绑定的方式定义范围, 然后右键就可以触发写好的菜单(需要阻止默认行为和绝对定位用 client 来定位), 这里需要注意的是 ie 和高级浏览器的阻止默认行为写法不一样. ie: event.returnValue = false; 高级浏览器: event.preventDefault();

### 2017 年 8 月 31 日

1. 事件委托可以解决多个事件监听内存多性能差的问题, 原理是利用了事件冒泡, 和 event 的 target 配合, 只添加一个事件处理程序, 用 switch 方法处理子节点的所有事件.

```html
<ul id="list">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
</ul>
```

```javascript
const LIST = document.getElementById("list");
LIST.addEventListener("click", function (e) {
  let event = e || window.event;
  let target = event.target || event.srcElement;

  if (target.tagName.toLowerCase() === "li") {
    console.log("content: ", target.innerHTML());
  }
});
```

### 2017 年 8 月 30 日

1. clientX, clientY pageX, pageY screenX, screenY 区别

```javascript
client: 相对屏幕左上角的距离;
page: 相对当前页面左上角的距离, 包含滚动条;
screen: 相对视口左上角的距离;
layer: 相对盒子模型左上角, border起算;
offset: 相对盒子模型左上角, content起算;

当页面的视口宽高和屏幕的宽高一样时: client和screen数值一样;
```

2. mouseenter, mouseleave mouseover, mouseout 区别

```javascript
mouseover优先于mouseenter触发, mouseout优先于mouseleave触发
mouseenter、mouseleave只对绑定的元素有效,
而mouseover、mouseout对绑定的子元素也会触发
```

3. click dblclick 触发原理

```javascript
mousedown mouseup click,
mousedown mouseup click mousedown mouseup click dblclick.
mousedown, mouseup 被取消, click 失效
```

4. typeof function(){} => 'function';  
   typeof (function(){})() => 'undefined' 没有 return 都是 undefined;  
   typeof (function(){return 1})() => 'number'

### 2017 年 8 月 29 日

addEventListener 和 attachEvent 的一些细节

1. 给页面中最后一代监听 addEvnetListener 时, true 和 false 都只会在事件冒泡阶段执行.
2. 解除监听的时候需要和添加监听时候的参数相同

```javascript
var btn = document.getElementById("myBtn");
btn.addEventListener(
  "click",
  function () {
    alert("hi");
  },
  false
);

// 解除无效, 此时的 function(){} 并不是上述那一个.
btn.removeEventListener(
  "click",
  function () {
    alert("hi");
  },
  false
);
```

解决的方法就是给函数一个变量, 传入变量即可.  
3.addEventListener 执行顺序是从上往下, ie 的 attachEvent 则相反. ie 和高级浏览器取消冒泡和取消默认行为也不一样, 需要做兼容.

```javascript
阻止冒泡: stopPropagation() / cancelBubble = true;
阻止默认事件: preventDefault() / returnValue = false;
```

### 2017 年 8 月 28 日 15:28:51

1. css 选择器的问题关于.的连接, 如 li.open.menu 是找到 li 元素同时有 open 和 menu 的类. li.open#menu, 找到 id 是 menuclass 是 open 的 li, .open.menu 是找到同时具有这两个类名的任意标签

### 2017 年 8 月 27 日 19:23:49

1. 函数表达式和函数声明

```javascript
var getName = function () {
  console.log("hsbds");
};
function getName() {
  console.log("hssm");
}

getName();
```

输出结果为 hsbds, 函数表达式在作用域里会变量提升, 而函数声明会函数提升, 理解了这一点就好办了, 可以想象函数声明的任何函数, 都是在作用域的最上方, 因此会被函数表达式覆盖.

### 2017 年 8 月 24 日 13:06:05

1. 操作节点的四种方法 appendChild(), insertBefore(), replaceChild(), removeChild().
   最常用的 appendChild(), 一个参数, 用于在父节点的类数组 childNodes 列表末尾添加一个节点. 添加完成后, childNodes 的最后一个节点关系指针得到相应更新. 更新完成后, appendChild()返回新增节点.

```javascript
var returnedNode = someNode.appendChild(newNode);
alert(returnedNode == newNode); // true
alert(newNode == someNode.lastChild); // true
```

如果要把节点放在 childNodes 的特定位置, 使用 insertBefore(), 两个参数, 第一个是需要插入的节点, 第二个是插入节点的位置. 第二个参数如果是 null, 和 appendChild()效果一致.

```javascript
var returnedNode = someNode.insertBefore(newNode, null);
alert(returnedNode == someNode.lastChild); // true

var returnedNode = someNode.insertBefore(newNode, someNode.firstChild);
alert(returnedNode == newNode); // true
alert(newNode == someNode.firstChild); // true

var returnedNode = someNode.insertBefore(newNode, someNode.lastChild);
alert(returnedNode == newNode); // true
alert(newNode == someNode.childNode[someNode.childNode.length - 2]); // true  newNode位于倒二
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

还有 cloneNode(), 可传参布尔值 true, cloneNode(true)表示深拷贝, 反之为浅. 还要有上述的添加节点方法, 不然拷贝完的副本是没有父节点的, 不在 Dom 树上.

### 2017 年 8 月 23 日 23:44:38

1. scss 写伪类的时候会有 bug(其实是自己没查文档)

```javascript
  a {
    :hover {
      ...
    }
  }
```

输出的 css 是

```javascript
  a {
    ...
  }

  a :hover {  // => 相当于 a *:hover
    ...
  }
```

解决的方法是在:hover 前面加上&即可.

### 2017 年 8 月 22 日 21:27:25

1. encodeURI()和 encodeURIComponent()的区别, 二者都可以将传递的字符串进行编码, 前者对(：;/?:@&=+\$,#)不会进行转义, 重点就是这个斜杠/和:. 比如一段 http://github.com/p silo 前者输出http://github.com/p%20silo, 后者输出 http%3A%2F%2Fgithub.com/p%20silo
2. 上述说到 url 地址, 针对 url 各个部分, BOM 的 location 也要相当注意. http://github.com:80/psilocine#Home?name=psilo&password=123
   1. location.hash => 锚部分 #Home
   2. location.host => 主机名和端口 github.com:80
   3. location.hostname => 主机名 github.com
   4. location.href => 完整 URL http://github.com:80/psilocine#Home
   5. location.pathname => 路径名 /psilocine
   6. location.port => 端口号 80
   7. location.protocol => 协议 http:
   8. location.search => 返回查询部分 ?name=psilo&password=123

### 2017 年 8 月 18 日 13:53:23

1. 还是 md 文档的坑, 这次关于代码块如何显示, 为何我们的代码块有时候显示有时候不显示?
   有下列方法可以抢救:

   1. 在要显示的代码块前后在加上两行, 然后每行加上三个`, 注意这里不是单引号 是 esc 下面的那个, 有很多网站都说是单引号, 一度让我很头疼. 这种方法可以显示代码的行数. 还可以在第一行的```后面写上语言, 比如 javascript.
   2. 在代码块前面缩进 4 个空格, 这里(有时候)有个坑, 也是我最气的, 就是代码前一行必须要空一行, 就可以了. 当然你也可以在上一行末尾加上 2 个空格, md 也会将其显示为空一行.
   3. 最无脑的, 就是找下在线 md 编辑器, 在里面尝试下, 直到可以了后再发布, 省得发布修改发布.

### 2017 年 8 月 16 日 22:02:50

1. md 文档中的链接, [psilo 的 github](http://github.com/)psilocine)如果链接里面有括号, 这种方法不适用, 会提前终止.  
   这时候就要选择其他的方法:
   1. 第一, 可以用转义, 左右括号在 href 里的表示分别是%28 %29.
   2. 用[psilo 的 github][id], 然后在文档的任意一行写上 id 的定义即可, 注意要加上中括号.
   3. 用[psilo 的 github]: 地址 然后同样在文档任意一行写上[psilo 的 github][]就行了.

### 2017 年 8 月 12 日 15:48:39

1. 要知道 DOMContentLoaded 和 window.onload 的区别

```javascript
DOMContentLoaed: dom内容加载完毕, script会阻塞dom的解析, 这也是script要后置的原因
load:页面所有的资源(图片、音频、视频等)加载完毕
```

2. 了解从输入 url 到得到 html 的详细过程、html css js 渲染过程等

```javascript
1.把域名解析成对应ip
  本地host文件是否有映射, 没有进入下一步
  查找本地DNS解析器缓存, 没有进入下一步
  查找本地DNS服务器, 没有进入下一步
  查询(根域名服务器 -> 顶级域服务器 -> 第二层域 -> 子域)
2.与ip的服务器建立连接(三次握手)
  三次握手为了防止已失效的连接请求报文段突然又传送到服务端,而产生错误
  client向server发送报文确认通道,
  server向client发送已收到ack, 并发送报文确认通道,
  client向server发送已收到ack, 开始传输
3.与服务器建立连接后发送请求
4.服务器接受请求之后,处理请求并完成响应
5.浏览器的接受数据和页面渲染,构建DOM树
  根据HTML解析出DOM树
  根据CSS解析生产CSS规则树(CSSOM)
  结合DOM树和CSS规则树,生成渲染树(Render Tree)
  根据渲染树计算每一个节点的信息
  根据计算好的信息绘制页面
6.关闭tcp连接(四次拜拜)
  tcp连接是全双工的,需要双方都主动关闭
```

3. 横向 nav li 有间距. 这是因为用了 inline-block 后, html 的文本节点也就是空格也会算进去,解决方法大概分以下几种:
   1. 用 float left 代替 display inline-block;
   2. li 标签之间不要有文本节点, (压缩后没此问题;
   3. 给 ul 一个 font-size:0, (缺点是要在 li 再设 font-size;

### 2017 年 8 月 9 日 17:46:53

1. 原型的 5 个重要规则.
   1. 所有的引用类型(对象,数组,函数)都具有对象特征, 即可自由扩展属性.
   2. 所有的引用类型都有一个**proto**属性, 属性值是一个普通的对象.
   3. 所有的函数, 都有一个 prototype 属性, 属性值也是一个普通的对象.
   4. 所有的引用类型,**proto**属性值指向它的构造函数的'prototype'属性值.
   5. 当试图得到一个对象的某个属性时, 如果这个对象本身没有, 那么会去它的**proto**(它的构造函数的 prototype)中寻找

### 2017 年 7 月 9 日 17:47:06

1. z-index 只能在定位元素在奏效, 如 position:absolute
2. 做 nav 时, 用 ul li 遇到图片和文字一起的时候, 默认文字在图片的 baseline, 文字会往下移动, 这时候不用调负 margin, 只用 vertical middle 就行

### 2017 年 5 月 20 日 23:58:26

1. class 命名最好大于等于三个字母, 如 advertisement, 不要写 ad (会被广告插件过滤掉, 写 adv, avt

### 2017 年 5 月 18 日 17:04:42

1. input type='submit' 会刷新页面, 填入的数据都刷没了
2. hexo d 更新时, 会把不是 hexo 的文件渲染掉(包括 readme.md 解决方法就是在根目录的 \_config.yml 里面找到 skip_render: 写入你不想被渲染掉的文件, 然后把文件放入 public 即可.
3. MongoDB 连接时, mongod --dbpath 这条的路径最好在根目录下建个目录, 即一层目录, 不然会连接失败.
4. .jade 格式的文件不要用 tab 不然会错误, 用空格即可.(我用的 notepad++来编辑, 在设置里可以把 tab 设置为空格

### 2017 年 3 月 22 日 23:47:50

1. 掌握 calc 方法 css3 重要方法 解决盒子溢出问题 2017 年 8 月 12 日 16:08:35 解决 calc 在低版本 ie 不兼容
2. @media screen and (max/min-width:???px) { ... } 媒体查询, 能够让浏览器在不同宽度显示不同表现

### 2017 年 3 月 17 日 18:27:50

1. 同一 css 里 background-size:cover; (自适应浏览器宽度)要放在 background-image:url(); 后面, 不然不起作用.
2. li 里面的 a 标签 用 display:inline-block height100% width100% 可以扩充到整个 li, hover 时比较美观.
3. eg: .demo:hover~ .box 是 hover demo 类时 box 类发生变化 前提是.box 的 css 要有 transition 等属性 注意不同浏览器不同写法

### 2017 年 3 月 12 日 22:19:58

1. 学会绘制三角形 css 方法 (虽然以后学 bs 好像更简洁
   用 span 或其他标签做个空容器,然后 css 写 border
   border-left:5px solid transparent
   border-right:5px solid transparent (注意这里的 5px 可改 不过要左右相等 才能对称
   border-bottom:10px solid 颜色自定义 (注意这里的 10px 可改 不过要是左右的和 才能是等边三角形
   display:inline-block; 这里 inline-block 是能让后面的在同一行显示

### 2017 年 3 月 2 日 00:14:38

1. 理解文本流和文档流(normal flow)区别 =>2017 年 5 月 20 日 00:14:04 解决
2. 什么是 dom 和 cssom => 2017 年 8 月 12 日 16:05:14 解决
3. box-sizing 干什么的 => 2017 年 8 月 12 日 16:05:26 解决 两种模式下区别, box-sizing 给了开发者选择盒子模型的权利, border-box: w3c 标准盒子模型, content-box: IE 盒子模型

### 2017 年 3 月 1 日 00:05:24

1. 双飞翼布局和圣杯布局 要搞透 =>2017 年 5 月 20 日 00:13:49 解决

```javascript
// 双飞翼
<div class="wrap"><
  <div class="center"></div> 两边设margin
</div>
<div class="left"></div> margin-left: -100%
<div class="right"></div> margin-left: 负值width

// 圣杯 DOM结构更加自然和自观 符合日常开发的习惯
<div class="wrap"> 两边设padding
  <div class="center"></div>
  <div class="left"></div> margin-left: -100%
  <div class="right"></div> margin-right: 负值width
</div>
```

2. 文本首行缩进用 css { text-indent: 属性值 ;}

### 2017 年 2 月 26 日 22:02:37

1. li 横向排列 用 display:inline
2. 顶部浮动 float 的导航栏 下方要清除浮动 clear:both/left/right 不然会遮挡住 补充 2017 年 3 月 1 日 00:07:46 clearfix 的多种方法,优缺点 =>2017 年 5 月 20 日 00:10:01 解决 clear:both 添加 div 破坏语义; overflow:hidden 会影藏超出父元素的内容; ::after 伪元素 没有明显弊端,适合使用
3. 顶部导航栏左右两边有空隙 待解决/ok => 2017 年 2 月 26 日 23:19:50 解决 浏览器自己的坑 本身浏览器 body 有 margin 和 padding, 需要把其二清除.

### 2017 年 2 月 26 日 23:03:14

1. 补充一点, 用 notepad++写 用 utf-8 无 ROM 编写 上传 github 中文会乱码!
