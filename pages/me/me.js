// 我的页
const app = getApp()
const { getStorage, KEYS } = require('../../utils/storage.js')

Page({
  data: {
    userInfo: null,
    myPostsCount: 0,
    favoritesCount: 0
  },

  onLoad() {
    this.loadUserInfo()
    this.loadCounts()
  },

  onShow() {
    this.loadUserInfo()
    this.loadCounts()
  },

  loadUserInfo() {
    const userInfo = getStorage(KEYS.USER_INFO) || app.globalData.userInfo
    this.setData({ userInfo })
  },

  loadCounts() {
    const myPosts = getStorage(KEYS.MY_POSTS) || []
    const favorites = getStorage(KEYS.FAVORITES) || []
    this.setData({
      myPostsCount: myPosts.length,
      favoritesCount: favorites.length
    })
  },

  onEditProfile() {
    wx.navigateTo({
      url: '/pages/edit-profile/edit-profile'
    })
  },

  onMyPosts() {
    wx.navigateTo({
      url: '/pages/my-posts/my-posts'
    })
  },

  onMyFavorites() {
    wx.navigateTo({
      url: '/pages/my-favorites/my-favorites'
    })
  }
})
