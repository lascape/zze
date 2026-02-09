// 系统头像组件
Component({
  properties: {
    // 头像URL
    avatar: {
      type: String,
      value: ''
    },
    // 尺寸：small/medium/large
    size: {
      type: String,
      value: 'medium'
    }
  },

  data: {
    defaultAvatar: '/assets/avatars/default.png'
  },

  methods: {
    onError() {
      this.setData({
        avatar: this.data.defaultAvatar
      })
    }
  }
})
