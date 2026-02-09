// 详情页
const { getPostById, CATEGORIES } = require('../../data/posts.js')
const { COMMUNITIES } = require('../../data/communities.js')
const { getStorage, setStorage, KEYS } = require('../../utils/storage.js')
const { getAvatarByUserId } = require('../../data/avatars.js')
const { formatTime } = require('../../utils/common.js')

Page({
  data: {
    post: null,
    isFavorited: false
  },

  onLoad(options) {
    const { id } = options
    if (id) {
      this.loadPost(id)
      this.checkFavorite(id)
    }
  },

  loadPost(id) {
    const post = getPostById(id)
    if (post) {
      const community = COMMUNITIES.find(c => c.id === post.communityId)
      const category = CATEGORIES[post.category.toUpperCase()]
      
      const enrichedPost = {
        ...post,
        communityName: community?.name || '',
        categoryName: category?.name || '',
        authorAvatar: getAvatarByUserId(post.authorId),
        timeStr: formatTime(post.createdAt)
      }
      
      this.setData({ post: enrichedPost })
    }
  },

  checkFavorite(postId) {
    const favorites = getStorage(KEYS.FAVORITES) || []
    const isFavorited = favorites.includes(postId)
    this.setData({ isFavorited })
  },

  onFavorite() {
    const { post, isFavorited } = this.data
    let favorites = getStorage(KEYS.FAVORITES) || []
    
    if (isFavorited) {
      favorites = favorites.filter(id => id !== post.id)
      wx.showToast({ title: '已取消收藏', icon: 'success' })
    } else {
      favorites.push(post.id)
      wx.showToast({ title: '收藏成功', icon: 'success' })
    }
    
    setStorage(KEYS.FAVORITES, favorites)
    this.setData({ isFavorited: !isFavorited })
  },

  onContact() {
    const { post } = this.data
    if (!post) return
    
    // 创建或打开会话
    let conversations = getStorage(KEYS.CONVERSATIONS) || []
    let conversation = conversations.find(c => c.postId === post.id)
    
    if (!conversation) {
      conversation = {
        id: 'conv_' + Date.now(),
        userId: post.authorId,
        userName: post.authorName,
        postId: post.id,
        postTitle: post.title,
        lastMessage: '',
        lastMessageTime: Date.now(),
        unread: false,
        unreadCount: 0,
        messages: []
      }
      conversations.unshift(conversation)
      setStorage(KEYS.CONVERSATIONS, conversations)
    }
    
    wx.navigateTo({
      url: `/pages/chat/chat?conversationId=${conversation.id}`
    })
  },

  onPreviewImage(e) {
    const { url } = e.currentTarget.dataset
    const { images } = this.data.post
    wx.previewImage({
      current: url,
      urls: images
    })
  }
})
