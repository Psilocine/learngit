
走过的一些坑,作此文档用来激励自己.
								-PsiloLau
								
2017年2月26日 23:03:14
*补充一点, 用notepad++写 用utf-8 无ROM 编写 上传github 中文会乱码!

2017年2月26日 22:02:37
1. li横向排列 用display:inline
2. 顶部浮动float的导航栏 下方要清除浮动clear:both/left/right 不然会遮挡住 补充 2017年3月1日 00:07:46  clearfix的多种方法,优缺点 待解决
3. 顶部导航栏左右两边有空隙 待解决/ok => 2017年2月26日 23:19:50解决 浏览器自己的坑 本身浏览器body有margin和padding, 需要把其二清除.

2017年3月1日 00:05:24
1. 双飞翼布局和圣杯布局 要搞透 待解决
2. 文本首行缩进用css { text-indent: 属性值 ;} 

2017年3月2日 00:14:38
1. 理解文本流和文档流(normal flow)区别 待解决
2. 什么是dom和cssom 待解决 https://yukun.im/performance/624#userconsent#
3. box-sizing干什么的 待解决

2017年3月12日 22:19:58
1.最近练车T T 没什么时间学习
2.学会绘制三角形css方法 (虽然以后学bs好像更简洁 
	用span或其他标签做个空容器,然后css写border
	border-left:5px solid transparent
	border-right:5px solid transparent	(注意这里的5px可改 不过要左右相等 才能对称
	border-bottom:10px solid 颜色自定义 (注意这里的10px可改  不过要是左右的和 才能是等边三角形
	display:inline-block; 这里inline-block是能让后面的在同一行显示
