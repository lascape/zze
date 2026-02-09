// 信息卡片组件
const { formatTime } = require('../../utils/common.js')
const { CATEGORIES } = require('../../data/posts.js')

Component({
  properties: {
    post: {
      type: Object,
      value: {}
    }
  },

  data: {
    formattedTime: ''
  },

  lifetimes: {
    attached() {
      this.updateFormattedTime()
    }
  },

  observers: {
    'post.createdAt': function(createdAt) {
      this.updateFormattedTime()
    }
  },

  methods: {
    updateFormattedTime() {
      if (this.data.post && this.data.post.createdAt) {
        this.setData({
          formattedTime: formatTime(this.data.post.createdAt)
        })
      }
    },

    onCardTap() {
      const post = this.data.post
      if (post && post.id) {
        wx.navigateTo({
          url: `/pages/detail/detail?id=${post.id}`
        })
      }
    },

    getCategoryName() {
      const post = this.data.post
      if (!post) return ''
      const category = CATEGORIES[post.category.toUpperCase()]
      return category ? category.name : ''
    }
  }
})
