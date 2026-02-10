// pages/profile/profile.js
Component({
  properties: {
    nickname: {
      type: String,
      value: '邻居4821'
    },
    currentCommunity: {
      type: String,
      value: '锦绣社区'
    }
  },

  methods: {
    onEditTap() {
      this.triggerEvent('edittap');
    },

    onMyPostsTap() {
      this.triggerEvent('mypoststap');
    },

    onFavoritesTap() {
      this.triggerEvent('favoritestap');
    },

    onSafetyTap() {
      this.triggerEvent('safetytap');
    }
  }
});
