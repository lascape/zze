// 发布页
const { CATEGORIES } = require('../../data/posts.js')

Page({
  data: {
    categories: [],
    showCategoryPicker: false
  },

  onLoad() {
    this.initCategories()
  },

  initCategories() {
    const categories = Object.values(CATEGORIES)
    this.setData({ categories })
  },

  onCategorySelect(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/publish-form/publish-form?category=${id}`
    })
  }
})
