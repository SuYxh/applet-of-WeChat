#   仿bilibili小程序

![](http://qn.huat.xyz/content/20200328145315.png)

### 一、公共头部组件

1.在引用组件的时候需要在被引用的组件的配置文件中添加  `"component": true,`

2.使用自定义组件需要在页面（那个页面使用就在那个页面配置）配置以下代码，一般是将组件都放在components文件夹中

```javascript
{
  "usingComponents": {
    "component-tag-name": "path/to/the/custom/component"
  }
}
```

### 二、首页导航模块

1.导航数据的来源--API

[导航API： https://www.fastmock.site/mock/3da1d43be05fc05b96c5e370efb36795/bili/navList ]( https://www.fastmock.site/mock/3da1d43be05fc05b96c5e370efb36795/bili/navList )

2.将数据渲染至页面

首先在index.js文件的data中定义一个`navList`的数组用来存储api返回的数据，通过 `wx:for`来循环输出到页面上；通过 `wx.request({})`方法来进行数据请求，通过`setData`方法将api返回的数据赋值给`navList`数组，并循环输出。

> **注意`this`的指向问题** , 通过将 `this` 暂存在 `that`中或者使用 `箭头函数`

3.写css将数据按照我们的意愿排列

先将数据横着排列，如效果图所示，CSS代码为

```css
/* 首页导航 */
.nav_wrap{}
.nav{
  white-space: nowrap;
  padding: 5rpx 0;
}
.nav_item{
  padding: 20rpx 45rpx;
  font-size: 30rpx;
  display: inline-block;
}
/* white-space属性指定元素内的空白怎样处理。
*  normal: 	默认。空白会被浏览器忽略。
*  pre :  空白会被浏览器保留。其行为方式类似 HTML 中的 <pre> 标签。
*  nowrap : 文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。
*  pre-wrap : 保留空白符序列，但是正常地进行换行。
*  pre-line : 合并空白符序列，但是保留换行符。
*/
```

通过小程序自带的组件 `scroll-view`  ，并配置 `scroll-x` 后可以进行`X`轴方向滚动

添加选中时候的粉色下划线: 

```css
.nav_item.active{
  border-bottom: 5rpx solid #de688b;
}
```

这个时候所有的导航都将被选中，通过js来判断：将选中的导航赋予  `active` 类  `{index===currentIndexNav?'active':''}}`，`currentIndexNav`将会被事先定义在 `data` 中，**如何获取当前选中的导航的索引** 

```vue
<scroll-view class="nav" scroll-x>
    <view bindtap="activeNav" data-index="{{ index }}" class="nav_item {{index===currentIndexNav?'active':''}} "  wx:for="{{ navList }}" wx:key="{{ index }}">
      {{item.text}}
    </view>
  </scroll-view>
```

```javascript
//点击首页导航获取其索引
  activeNav : function(e){
      console.log(123)
      this.setData({
        currentIndexNav:e.target.dataset.index
      })
  }
```

 那么通过代码怎么获取导航的索引呢？  在这个`activeNav`方法中获取`index`。参数e是系统给我们传递的事件,然后`e.currentTarget`是获取当前你点击的是哪个组件, `e.currentTarget.dataset`是获取自定义属性的集合,因为可以自定义很多个属性,`e.currentTarget.dataset.detailid`是获取具体某一个属性的值,在这要特别注意,若我们在wxml自定义属性是data-Index,会发现后面这个Id中的I是大写的,但是通过代码获取都会转为小写。

 `current`触发事件的组件的一些属性值集合 

`currentTarget`当前组件的一些属性值集合 

### 三、首页轮播

1.轮播数据源

[  https://www.fastmock.site/mock/3da1d43be05fc05b96c5e370efb36795/bili/swiperList  ](  https://www.fastmock.site/mock/3da1d43be05fc05b96c5e370efb36795/bili/swiperList  )

2.渲染数据的方法同上

3.轮播组件的常用属性

```html
<!-- 轮播组件 -->
<view class="slides">
  <swiper indicator-dots="true" autoplay="true" circular="true">
    <swiper-item wx:for="{{swiperList}}" wx:key="{{index}}">
      <navigator>
        <image src="{{item.imgSrc}}" mode="widthFix"></image>
      </navigator>
    </swiper-item>
  </swiper>
</view>

<!-- indicator-dots 是否显示面板指示点
indicator-color 指示点颜色
indicator-active-color 当前选中的指示点颜色
autoplay 是否自动切换
interval  自动切换时间间隔
duration  滑动动画时长
circular  是否采用衔接滑动 -->
```



4.增加css样式

将轮播组件`swiper`的高度调整至 220rpx ；`navigator`和`image`都自适应

```css
/* 首页轮播 */
.slides{
  margin-top: 10rpx;
}
.slides swiper{
  height: 220rpx;
}
.slides navigator{
  height: 100%;
  width: 100%;
}
.slides image{
  height: 100%;
  width: 100%;
}
```

### 四、视频列表

1.视频列表API

[ https://www.fastmock.site/mock/3da1d43be05fc05b96c5e370efb36795/bili/videosList ](  https://www.fastmock.site/mock/3da1d43be05fc05b96c5e370efb36795/bili/videosList )

2.渲染数据，方法同上

```vue
<view class="video_wrap">
  <navigator url="/pages/detial/detial?id={{ item.id }}" class="video_item" wx:for="{{ videosList }}" wx:key="{{ index }}">
    <!-- 图片容器 -->
    <view class="video_img">
      <!-- 图片 -->
      <image mode="widthFix" src="{{item.imgSrc}}"></image>
      <!-- 播放量 -->
      <view class="video_info">
        <!-- 播放量 -->
          <view class="play_count_wrap">
          <!-- 图标 -->
          <text class="fa fa-play-circle-o" ></text>
          <!-- 数值 -->
          <text class="play_count" >{{ item.playCount }}</text>
          </view>
        <!-- 评论量 -->
         <view class="comment_count_row">
          <!-- 图标 -->
          <text class="fa fa-commenting-o" ></text>
          <!-- 数值 -->
          <text class="comment_count" >{{ item.commentCount }}</text>
         </view>
      </view>
    </view>
    <!-- 标题 -->
    <view class="video_title">{{ item.desc }}</view>
  </navigator>
</view>
```



3.css布局

```css
/*  视频列表 **/
.video_wrap{
  display: flex;
  flex-wrap: wrap;
  padding: 5rpx;
  justify-content: space-between;
}

.video_item{
  width: 48%;
  margin-bottom: 20rpx;
}

.video_img{
  position: relative;
}
.video_img image{
 width: 100%;
 border-radius: 15rpx;
}
.video_img .video_info{
  position: absolute;
  bottom: 10rpx;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  color: white;
  font-size: 24rpx;
}
.video_title{
 font-size: 28rpx;
 display: -webkit-box;
 overflow: hidden;
 white-space: normal;
 text-overflow: ellipsis;
 word-wrap: break-word;
 -webkit-line-clamp: 2;
-webkit-box-orient: vertical;
}
```

> - flex-wrap 属性规定flex容器是单行或者多行，同时横轴的方向决定了新行堆叠的方向。 
>
>   ​	nowrap : 默认值。规定灵活的项目不拆行或不拆列。 
>
>   ​	wrap ：  规定灵活的项目在必要的时候拆行或拆列。
>
>   ​	wrap-reverse ：    规定灵活的项目在必要的时候拆行或拆列，但是以相反的顺序。 
>
> - justify-content ：【水平方向对齐方式】用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。
>
>   ​	 flex-start ：  默认值。项目位于容器的开头。 
>
>   ​	 flex-end ： 项目位于容器的结尾。 
>
>   ​	 center：  项目位于容器的中心。 
>
>    	space-between ： 项目位于各行之间留有空白的容器内。 
>
>   ​	 space-around ：项目位于各行之前、之间、之后都留有空白的容器内。
>
> - align-items：【垂直方向对齐方式】设置了flex容器的对齐方式。 
>
>   ​	 stretch ：  默认。 拉伸元件以适应容器。 
>
>   ​	 center ：  中心元素在容器内。 
>
>   ​	 flex-start： 位置元素在容器的开头。
>
>   ​	 flex-end： 位置元素在容器的结尾。  
>
>   ​	 baseline ：  位置元素在容器的基线 。
>
> -  white-space 属性指定元素内的空白怎样处理。 
>
>   ​	normal：默认。空白会被浏览器忽略。
>
>   ​	pre ：  空白会被浏览器保留。其行为方式类似 HTML 中的 <pre> 标签。 
>
>   ​	nowrap： 文本不会换行，文本会在在同一行上继续，直到遇到 &lt;br&gt; 标签为止。 
>
>   ​	 pre-wrap : 保留空白符序列，但是正常地进行换行。 
>
>   ​	 pre-line : 合并空白符序列，但是保留换行符。 
>
> -  word-wrap 属性允许长的内容可以自动换行。 
>
>   ​	normal :  只在允许的断字点换行（浏览器保持默认处理）。 
>
>   ​	 break-word :  在长单词或 URL 地址内部进行换行。 
>
> -  word-spacing 属性增加或减少字与字之间的空白。 
>
>   ​	 normal : 默认。定义单词间的标准空间。 
>
>   ​	 length: 定义单词间的固定空间。 
>
> -  overflow  属性指定如果内容溢出一个元素的框，会发生什么。 
>
>   ​	 visible : 默认值。内容不会被修剪，会呈现在元素框之外。 
>
>   ​	 hidden : 内容会被修剪，并且其余内容是不可见的。
>
>   ​	 scroll :  内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。 
>
>   ​      auto: 如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容 
>
> -  text-overflow  属性指定当文本溢出包含它的元素，应该发生什么。 
>
>   ​	 clip : 修剪文本
>
>   ​	 ellipsis ： 显示省略符号来代表被修剪的文本。 
>
>   ​	 string : 使用给定的字符串来代表被修剪的文本。 

### 五、创建视频详情页面

**视频中创建的视频详情页面传递了参数，由于没有相关的api，本次练习仅仅只传递参数，而不通过参数进行判断**

参数如何传递？参数传递过去了在哪里接收？

```vue
<!-- 通过URL跳转时候讲id传递到页面 ， 在相关页面打印 options 可得到id的值  --> 
<navigator url="/pages/detial/detial?id={{ item.id }}" class="video_item" wx:for="{{ videosList }}" wx:key="{{ index }}">
```

```javascript
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },
```

### 六、视频详情

1.视频详情api

 https://www.fastmock.site/mock/3da1d43be05fc05b96c5e370efb36795/bili/videoDetail 

2.wxml 代码

```vue
<!-- 视频详情 -->
  <view class="info">
    <video :src="{{videoInfo.url}}" controls></video>
    <!-- 详情 -->
    <view class="title">
      {{videoInfo.describe}}</view>
    <view class="detail">
      <text class="author">{{videoInfo.author}}</text>
      <text class="playcount">播放量{{videoInfo.playCount}}</text>
      <text class="commentcount">{{videoInfo.commentCount}}弹幕</text>
      <text class="date">发布时间{{videoInfo.date}}</text>
    </view>
  </view>
```

3. wxss 代码

```css
.info{
  margin-top: 10rpx;
}
video{
  width: 100%;
}
.title{
  display: flex;
  justify-content: space-around;
  font-size: 35rpx;
}
.detail{
   margin-top: 5rpx;
   font-size: 28rpx;
}
text{
  margin-left: 20rpx;
}
.author{
  color: #000;
}
```

### 七、推荐视频

1.推荐视频API

 https://www.fastmock.site/mock/3da1d43be05fc05b96c5e370efb36795/bili/othersList 

2.wxml 代码

```vue
<!-- 推荐视频 -->
  <view class="other">
    <navigator class="item_other" wx:for="{{othersList}}" wx:key="{{index}}">

      <view class="img-wrap">
        <image src="{{item.imgSrc}}" mode="widthFix"></image>
      </view>

      <view class="other_inof">
        <view class="other_title">{{item.title}}</view>

        <view class="other_detail">
          <view class="play_count">{{item.playMsg}}次观看</view>
          <view class="comment_count">{{item.commentCount}}</view>
        </view>

      </view>
    </navigator>
  </view>
```



3.wxss代码

```css
/* 推荐视频 */
.other{
  margin-top: 10rpx;
}
.item_other{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
}
.img-wrap{
  width: 38%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-wrap image{
  width: 90%;
  border-radius: 15rpx;
}
.other_inof{
  width: 60%;
}
.other_title{
  font-size: 30rpx;
  color: #f40;
}
.other_detail{
  font-size: 26rpx;
  color: #666;
}
```

### 八、评论模块

1.API数据

 https://www.fastmock.site/mock/3da1d43be05fc05b96c5e370efb36795/bili/commentList 

2.wxml 代码

```vue
<!-- 评论 -->
  <view class="comment_wrap">
    <text>评论总数：{{commentData.commentTotalCount}}</text>

    <view class="comment_item" wx:for="{{commentData.commentList}}" wx:key="{{index}}">
      <view class="comment_user">
        <image src="{{item.userIconSrc}}" mode="widthFix"></image>
      </view>

      <view class="comment_info">
        <view class="comment_detail">
          <text class="author">{{item.username}}</text>
          <text class="data">发布时间：{{item.commentDate}}</text>
        </view>

        <view class="comment_content">
          {{item.commentInfo}}</view>
      </view>

    </view>
  </view>
```



3.wxss 代码

```css
/* 评论 */
.comment_wrap{

}
.comment_title{
  padding: 10rpx;
  font-size: 28rpx;
}
.comment_item{
  margin-bottom: 10rpx;
  padding: 10rpx;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #666;
}
.comment_user{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.comment_user image{
  width: 60%;
  border-radius: 50%;
}
.comment_info{
  flex: 6;
  display: flex;
  justify-content: space-around;
  flex-direction: column;

}
.comment_detail{
  display: flex;
  justify-content: space-around;
}
.comment_detail .author{
  font-size: 28rpx;
  color: #000;
}
.comment_detail .date{
  font-size: 20rpx;
  color: #666;
}
.comment_content{
  font-size: 28rpx;
  color: #000;
  text-indent: 20rpx;
}
```

