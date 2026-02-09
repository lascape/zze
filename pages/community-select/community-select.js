// 社区选择页
const { COMMUNITIES } = require('../../data/communities.js')
const { getStorage, setStorage, KEYS } = require('../../utils/storage.js')

Page({
  data: {
    communities: [],
    currentCommunityId: ''
  },

  onLoad() {
    const currentCommunity = getStorage(KEYS.CURRENT_COMMUNITY)
    this.setData({
      communities: COMMUNITIES,
      currentCommunityId: currentCommunity?.id || ''
    })
  },

  onCommunitySelect(e) {
    const { id } = e.currentTarget.dataset
    const community = COMMUNITIES.find(c => c.id === id)
    
    if (community) {
      setStorage(KEYS.CURRENT_COMMUNITY, community)
      wx.showToast({
        title: '已切换社区',
        icon: 'success'
      })
      
      setTimeout(() => {
        wx.navigateBack()
      }, 500)
    }
  }
})
