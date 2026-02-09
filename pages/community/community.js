// 社区页
const app = getApp()
const { getPosts, CATEGORIES } = require('../../data/posts.js')
const { COMMUNITIES } = require('../../data/communities.js')
const { getStorage, setStorage, KEYS } = require('../../utils/storage.js')
const { getAvatarByUserId } = require('../../data/avatars.js')

Page({
  data: {
    currentCommunity: null,
    categories: [],
    posts: [],
    loading: false
  },

  onLoad() {
    this.initCategories()
    this.loadCurrentCommunity()
  },

  onShow() {
    this.loadCurrentCommunity()
    this.loadPosts()
  },

  initCategories() {
    const categories = Object.values(CATEGORIES)
    this.setData({ categories })
  },

  loadCurrentCommunity() {
    const currentCommunity = getStorage(KEYS.CURRENT_COMMUNITY) || COMMUNITIES[0]
    this.setData({ currentCommunity })
  },

  loadPosts() {
    this.setData({ loading: true })
    
    const currentCommunity = this.data.currentCommunity
    const posts = getPosts({ 
      communityId: currentCommunity.id,
      range: 'community'
    })

    // 添加社区名称和头像
    const enrichedPosts = posts.map(post => ({
      ...post,
      communityName: COMMUNITIES.find(c => c.id === post.communityId)?.name || '',
      categoryName: CATEGORIES[post.category.toUpperCase()]?.name || '',
      authorAvatar: getAvatarByUserId(post.authorId)
    }))

    this.setData({ 
      posts: enrichedPosts,
      loading: false
    })
  },

  // 点击社区切换
  onCommunityTap() {
    wx.navigateTo({
      url: '/pages/community-select/community-select'
    })
  },

  // 点击分类进入发现页
  onCategoryTap(e) {
    const { id } = e.currentTarget.dataset
    // 设置范围为本社区
    setStorage(KEYS.DISCOVERY_RANGE, 'community')
    wx.switchTab({
      url: '/pages/discovery/discovery',
      success: () => {
        // 通过事件传递分类信息
        const pages = getCurrentPages()
        const discoveryPage = pages.find(p => p.route === 'pages/discovery/discovery')
        if (discoveryPage) {
          discoveryPage.setData({ 
            activeCategory: id,
            range: 'community'
          })
          discoveryPage.loadPosts()
        }
      }
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadPosts()
    wx.stopPullDownRefresh()
  }
})
