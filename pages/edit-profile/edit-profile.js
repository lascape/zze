// 编辑个人资料页
const app = getApp()
const { getStorage, setStorage, KEYS } = require('../../utils/storage.js')
const { checkNickname, showSensitiveWordTip } = require('../../utils/keyword-filter.js')
const { SYSTEM_AVATARS } = require('../../data/avatars.js')

Page({
  data: {
    userInfo: null,
    nickname: '',
    selectedAvatar: '',
    systemAvatars: SYSTEM_AVATARS,
    showAvatarPicker: false
  },

  onLoad() {
    const userInfo = getStorage(KEYS.USER_INFO) || app.globalData.userInfo
    this.setData({
      userInfo,
      nickname: userInfo.nickname,
      selectedAvatar: userInfo.avatar
    })
  },

  onNicknameChange(e) {
    this.setData({ nickname: e.detail.value })
  },

  onAvatarTap() {
    this.setData({ showAvatarPicker: !this.data.showAvatarPicker })
  },

  onSelectAvatar(e) {
    const { avatar } = e.currentTarget.dataset
    this.setData({
      selectedAvatar: avatar,
      showAvatarPicker: false
    })
  },

  onSave() {
    const { nickname, selectedAvatar } = this.data
    
    if (!nickname.trim()) {
      wx.showToast({
        title: '昵称不能为空',
        icon: 'none'
      })
      return
    }
    
    // 检查昵称敏感词
    const check = checkNickname(nickname)
    if (!check.valid) {
      showSensitiveWordTip(check.keyword)
      return
    }
    
    const userInfo = {
      ...this.data.userInfo,
      nickname: nickname.trim(),
      avatar: selectedAvatar
    }
    
    setStorage(KEYS.USER_INFO, userInfo)
    app.globalData.userInfo = userInfo
    
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    })
    
    setTimeout(() => {
      wx.navigateBack()
    }, 1000)
  }
})
