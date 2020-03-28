Page({

  /**
   * 页面的初始数据
   */
  data: {
    //被点击的首页导航的菜单的索引
    currentIndexNav:0,
    // 首页导航数据
    navList:[],
    //首页轮播数据
    swiperList:[],
    //视频数据
    videosList:[]
  },

  /**
   * 获取导航数据
   */
  getNavList(){
    var  that = this;
    wx.request({
      url: 'https://mockapi.eolinker.com/7b7NMB9c75d613bc39c8f16e4e03a3d4a8f951750079dc5/navList',
      success:function(res){
        // console.log(res);
        // console.log(res.data.data.navList);
        // console.log(res.data.code);
        if (res.data.code == 0){
          // console.log("ok");
          that.setData({
            navList: res.data.data.navList
          })
        }
      }
    })
  },

  //获取轮播数据
getSwiperList:function(){
  
  wx.request({
    url: 'https://mockapi.eolinker.com/7b7NMB9c75d613bc39c8f16e4e03a3d4a8f951750079dc5/swiper',
    method:'GET',
    success:(res)=>{
      // console.log(res.data.data.swiperList);
      if(res.data.code === 0){
        this.setData({
          swiperList: res.data.data.swiperList
        })
      }
    }
  })
},

//点击首页导航获取其索引
  activeNav : function(e){
    //console.log(e.target.dataset.index);
    //console.log(e.currentTarget.dataset.index);

      this.setData({
        currentIndexNav:e.target.dataset.index
      })
  },



  //点击首页导航获取其索引
  activeNav: function (e) {
    //console.log(e.target.dataset.index);
    //console.log(e.currentTarget.dataset.index);

    this.setData({
      currentIndexNav: e.target.dataset.index
    })
  },

  // 获取视频数据
  getVideosList() {
    let that = this;
    wx.request({
      url: 'https://www.fastmock.site/mock/0cc8353a68511aad722aa387610a4ce1/bili/videosList',
      success(res) {
        // console.log(res);
        if (res.data.code == 0) {
          that.setData({
            videosList: res.data.data.videosList
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取首页导航数据
    this.getNavList();
    this.getSwiperList();
    this.getVideosList();
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})