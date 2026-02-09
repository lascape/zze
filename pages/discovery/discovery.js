// 发现页
const { getPosts, CATEGORIES } = require('../../data/posts.js')
const { COMMUNITIES } = require('../../data/communities.js')
const { getStorage, setStorage, KEYS } = require('../../utils/storage.js')
const { getAvatarByUserId } = require('../../data/avatars.js')

Page({
  data: {
    range: 'nearby', // nearby 或 community
    activeCategory: 'rent',
    categories: [],
    posts: [],
    searchValue: '',
    loading: false
  },

  onLoad(options) {
    this.initCategories()
    
    // 从 URL 参数获取分类和范围
    if (options.category) {
      this.setData({ activeCategory: options.category })
    }
    if (options.range) {
      this.setData({ range: options.range })
    }
  },

  onShow() {
    // 加载保存的范围设置
    const range = getStorage(KEYS.DISCOVERY_RANGE) || 'nearby'
    this.setData({ range })
    this.loadPosts()
  },

  initCategories() {
    const categories = Object.values(CATEGORIES)
    this.setData({ categories })
  },

  loadPosts() {
    this.setData({ loading: true })
    
    const { range, activeCategory } = this.data
    const currentCommunity = getStorage(KEYS.CURRENT_COMMUNITY)
    
    const posts = getPosts({
      communityId: range === 'community' ? currentCommunity.id : null,
      category: activeCategory,
      range: range
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

  // 切换范围
  onRangeChange(e) {
    const range = e.currentTarget.dataset.range
    this.setData({ range })
    setStorage(KEYS.DISCOVERY_RANGE, range)
    this.loadPosts()
  },

  // 切换分类
  onCategoryChange(e) {
    const { value } = e.detail
    this.setData({ activeCategory: value })
    this.loadPosts()
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({ searchValue: e.detail.value })
  },

  // 搜索
  onSearch() {
    wx.showToast({
      title: '搜索功能开发中',
      icon: 'none'
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadPosts()
    wx.stopPullDownRefresh()
  }
})
