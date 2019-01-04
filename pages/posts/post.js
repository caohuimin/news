 var postData = require('../../data/post-data.js')
//  这里必须使用相对路径，规定
// 使用require方法加载js模块文件
 
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onPostTap:function(event){
   var postId = event.currentTarget.dataset.postid;
   wx:wx.navigateTo({
     url: 'post-detail/post-detail?id='+postId
   })
  },

  // onSwiperItemTap:function(event){
  //   var postId = event.currentTarget.dataset.postid;
  //   wx: wx.navigateTo({
  //     url: 'post-detail/post-detail?id=' + postId
  //   })
  // },

  onSwiperTap:function(evet){
    // target和currenttarget的区别
    //target指的是当前点击的组件，currentTarget指的是事件捕获的组件
    //target这里指的是image，而currentarget指的是swiper
    var postId = evet.target.dataset.postid;
    wx: wx.navigateTo({
    url: 'post-detail/post-detail?id=' + postId
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    this.setData({
      posts_key:postData.postList
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})