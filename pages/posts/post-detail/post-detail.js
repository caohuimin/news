var postsData = require('../../../data/post-data.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  setAudioMonitor: function(event) {
    var that = this;
    wx.onBackgroundAudioPlay(function() {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayigMusic = true
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    });
    wx.onBackgroundAudioPause(function() {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayigMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var globalData = app.globalData;
    var postId = options.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    this.setData(postData);


    var postsCollected = wx.getStorageSync("post_collected");
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      if (postCollected) {
        this.setData({
          collected: postCollected
        })
      }

    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("post_collected", postsCollected);
    }

    if (app.globalData.g_isPlayigMusic && app.globalData.g_currentMusicPostId===postId) {
      this.setData({
        isPlayingMusic: true
      })
    }

    this.setAudioMonitor();
    //  wx.setStorageSync('key', {
    //      game:"风暴英雄",
    //      developer:"暴雪"
    //  })

  },




  onCollectionTap: function(event) { //这里是异步
    var postsCollected = wx.getStorageSync("post_collected");
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    //更新文章是否的缓存值
    wx.setStorageSync("post_collected", postsCollected);
    //更新数据绑定变量，从而实现图片切换
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消收藏",
      duration: 1000,
      icon: "success"
    })



  },
  //同步
  // getPostStorageAsy: function (event) {
  //  var that = this;
  //  wx.getStorage({
  //    key: 'post_collected',
  //    success: function(res) {
  //      var postsCollected = res.data;
  //      var postCollected = postsCollected[that.data.currentPostId];
  //      postCollected = !postCollected;
  //      postsCollected[that.data.currentPostId] = postCollected;
  //      that.showToast(postsCollected,postCollected);
  //    }
  //  })
  // },
  onShareTap: function(event) {
    var itemList = [
      "分享到微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res) {
        //  res.cancel 用户是不是点击了取消按钮
        //  res.tapIndex  数组元素序号  从0开始
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '用户是否取消？' + res.cancel + "现在还无法实现分享功能"
        })
      }
    })
  },
  onMusicTap: function(event) {
    var postData = postsData.postList;
    console.log(postData[this.data.currentPostId].music.url)
    var isPlayingMusic = this.data.isPlayingMusic;
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    if (isPlayingMusic) {
      backgroundAudioManager.pause();
      this.setData({
        isPlayingMusic: false
      })
    } else {
      backgroundAudioManager.title = postData[this.data.currentPostId].music.title
      backgroundAudioManager.epname = '此时此刻'
      backgroundAudioManager.singer = '许巍'
      backgroundAudioManager.coverImgUrl = postData[this.data.currentPostId].music.coverImg
      // 设置了 src 之后会自动播放
      backgroundAudioManager.src = postData[this.data.currentPostId].music.url;
      this.setData({
        isPlayingMusic: true
      })
    }

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