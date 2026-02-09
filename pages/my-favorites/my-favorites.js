// 我的收藏页
const { getStorage, setStorage, KEYS } = require('../../utils/storage.js')
const { MOCK_POSTS, CATEGORIES } = require('../../data/posts.js')
const { COMMUNITIES } = require('../../data/communities.js')
const { getAvatarByUserId } = require('../../data/avatars.js')

Page({
  data: {
    favoritePosts: []
  },

  onLoad() {
    this.loadFavorites()
  },

  onShow() {
    this.loadFavorites()
  },

  loadFavorites() {
    const favorites = getStorage(KEYS.FAVORITES) || []
    const myPosts = getStorage(KEYS.MY_POSTS) || []
    
    // 从 MOCK_POSTS 和 myPosts 中查找收藏的帖子
    const allPosts = [...MOCK_POSTS, ...myPosts]
    const favoritePosts = favorites
      .map(favoriteId => allPosts.find(post => post.id === favoriteId))
      .filter(post => post) // 过滤掉不存在的帖子
      .map(post => ({
        ...post,
        communityName: COMMUNITIES.find(c => c.id === post.communityId)?.name || '',
        categoryName: CATEGORIES[post.category.toUpperCase()]?.name || '',
        authorAvatar: getAvatarByUserId(post.authorId)
      }))
    
    this.setData({ favoritePosts })
  },

  onPostTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },

  onUnfavorite(e) {
    const { id } = e.currentTarget.dataset
    
    wx.showModal({
      title: '取消收藏',
      content: '确定要取消收藏吗？',
      success: (res) => {
        if (res.confirm) {
          let favorites = getStorage(KEYS.FAVORITES) || []
          favorites = favorites.filter(fav => fav !== id)
          setStorage(KEYS.FAVORITES, favorites)
          this.loadFavorites()
          
          wx.showToast({
            title: '已取消收藏',
            icon: 'success'
          })
        }
      }
    })
  }
})
