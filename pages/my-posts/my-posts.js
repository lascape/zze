// 我的发布页
const { getStorage, setStorage, KEYS } = require('../../utils/storage.js')
const { CATEGORIES } = require('../../data/posts.js')
const { COMMUNITIES } = require('../../data/communities.js')
const { getAvatarByUserId } = require('../../data/avatars.js')
const { formatTime } = require('../../utils/common.js')

Page({
  data: {
    activeStatus: 'all', // all, pending, approved, rejected
    allPosts: [],
    displayPosts: []
  },

  onLoad() {
    this.loadPosts()
  },

  onShow() {
    this.loadPosts()
  },

  loadPosts() {
    const myPosts = getStorage(KEYS.MY_POSTS) || []
    
    const enrichedPosts = myPosts.map(post => ({
      ...post,
      communityName: COMMUNITIES.find(c => c.id === post.communityId)?.name || '',
      categoryName: CATEGORIES[post.category.toUpperCase()]?.name || '',
      authorAvatar: getAvatarByUserId(post.authorId),
      timeStr: formatTime(post.createdAt)
    }))
    
    this.setData({
      allPosts: enrichedPosts
    })
    
    this.filterPosts()
  },

  filterPosts() {
    const { allPosts, activeStatus } = this.data
    let displayPosts = allPosts
    
    if (activeStatus !== 'all') {
      displayPosts = allPosts.filter(post => post.status === activeStatus)
    }
    
    this.setData({ displayPosts })
  },

  onStatusChange(e) {
    const { status } = e.currentTarget.dataset
    this.setData({ activeStatus: status })
    this.filterPosts()
  },

  onPostTap(e) {
    const { id, status } = e.currentTarget.dataset
    
    if (status === 'approved') {
      wx.navigateTo({
        url: `/pages/detail/detail?id=${id}`
      })
    }
  },

  onResubmit(e) {
    const { id } = e.currentTarget.dataset
    const myPosts = getStorage(KEYS.MY_POSTS) || []
    const post = myPosts.find(p => p.id === id)
    
    if (post) {
      wx.navigateTo({
        url: `/pages/publish-form/publish-form?category=${post.category}&resubmitId=${id}`
      })
    }
  },

  onDelete(e) {
    const { id } = e.currentTarget.dataset
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条发布吗？',
      success: (res) => {
        if (res.confirm) {
          let myPosts = getStorage(KEYS.MY_POSTS) || []
          myPosts = myPosts.filter(p => p.id !== id)
          setStorage(KEYS.MY_POSTS, myPosts)
          this.loadPosts()
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          })
        }
      }
    })
  }
})
