#1.一些原子类?
**.fl**
**.fr**
**.irp**

#2.设置模块名称
不同的类别: 用ma, mb, mc ,md 来表示不同类型的模块
不同的个体: 用ma1, ma2, ma3 来表示模块编号
#zwb老师的CSS给我的启事
* #h .r / #b .r / #f .r 把页面结构分的一目了然

#3.问题,及解决方法
1. IE6中设置 .logo 时 text-indent:-9999px;的.irp 会导致背景图也消失
临时解决方法: 把.irp中原来的文字删去,从而不用设置text-indent属性.
2. IE6中有的input 有默认的padding和margin 与 现代浏览器的不一样
临时解决方法: 增加整体的width属性.
3. IE6中的input使用背景时,如果字符串过长的话,背景会移动.
4. makeSlider 在IE6中使用出现了 title栏目和,nav无法正确定位的情况.原因可能是因为.slider 这个container并不能很好的根据img调节自身的高度,倒是其他元素的绝对定位失效.
解决方法: 给.slider这个container元素添加高度属性就可以解决.
5. IE6不支持自定义"grey"这个颜色.."red" "blue"正常
6. IE中inline级别的元素float时候可能会产生stepdown现象,因为他们之间是有空格的(我们常常把两个<a>写在不同的行,就造成了空格);

#4.总结与不足: 第一次在现代浏览器和IE中实现了psd2HTML,可能代码写的是乱了点.就这样放着,以后可以好好回味一下.
* 自己写的$.fn.makeSlider 好像在IE中还是存在bug,下一步在来修改.
* 页面有几个明显的不足之处:1)那些使用灵活宽度的容器(e.g: .r),然后把背景positon: 0 center,缩小浏览器的窗口时背景图会发生偏移. 2).input中输入超过input容器的宽度的字符时,IE6中input设置的背景图会发生偏移.
