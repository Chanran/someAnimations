# CSS3 RGBA

## 定义

CSS3 RGBA是基于RBG的基础上加了通道Alpha，RGBA分别表示Red,Green,Blue,Alpha。

## 语法

R: 红色值。正整数|百分数
G: 绿色值。正整数|百分数
B：蓝色值。正整数|百分数
A：透明度。取值0~1之间

## 取值

正整数取值： 0~255
百分数取值：0.0%~100.0%
注：超出范围的数值将被截止与之最接近的取值极限。比如，260最终还是显示255的效果。

## 兼容性

并非所有浏览器都支持使用百分数值的RGBA，A只能取值在0~1之间。

IE9+，Firefox 3.0.10+, Chrome 2.0.x+, Opera 9.64+, Safari 4+

## 例子

当颜色值来使用

```

<div class="test">
  <a href="https://chanran.github.io">我的博客</a>
</div>


.test{
  color:rgba(255,255,255,0.5); /*设置文字颜色为白色，半透明（其实还是白色）*/
  background:rgba(0,0,0,0.5); /*设置背景颜色为黑色，半透明*/
}
```

## 与css2属性opacity对比

1. 拥有opacity属性的当前元素的后代元素都具有透明性，也就是如果将一个盒子的父元素设置opacity为0.5(半透明)，那么这个盒子包裹的元素（后代元素）都变成半透明。

opacity:
```
<div class="test">
  <a href="https://chanran.github.io">我的博客</a>
</div>

.test{
  opacity:0.1;
  color:red;
  background:black;
}
/*最终连文字都透明了，不是我们想要的结果*/
```
RGBA:
```
<div class="test">
  <a href="https://chanran.github.io">我的博客</a>
</div>

.test{
  color:red;
  background:rbga(0,0,0,0.1); /*背景颜色为黑色，但是90%的透明*/
}
/*得到了我们想要的结果*/
```

2. css2的opacity属性比css3的rgba兼容性好


