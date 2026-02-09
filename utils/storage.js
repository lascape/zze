// 本地存储管理工具

const KEYS = {
  CURRENT_COMMUNITY: 'current_community',
  DISCOVERY_RANGE: 'discovery_range',
  USER_INFO: 'user_info',
  MY_POSTS: 'my_posts',
  FAVORITES: 'favorites',
  CONVERSATIONS: 'conversations',
  NOTIFICATIONS: 'notifications'
}

// 获取存储数据
function getStorage(key) {
  try {
    const value = wx.getStorageSync(key)
    return value || null
  } catch (e) {
    console.error('getStorage error:', e)
    return null
  }
}

// 设置存储数据
function setStorage(key, value) {
  try {
    wx.setStorageSync(key, value)
    return true
  } catch (e) {
    console.error('setStorage error:', e)
    return false
  }
}

// 删除存储数据
function removeStorage(key) {
  try {
    wx.removeStorageSync(key)
    return true
  } catch (e) {
    console.error('removeStorage error:', e)
    return false
  }
}

// 清空所有存储
function clearStorage() {
  try {
    wx.clearStorageSync()
    return true
  } catch (e) {
    console.error('clearStorage error:', e)
    return false
  }
}

module.exports = {
  KEYS,
  getStorage,
  setStorage,
  removeStorage,
  clearStorage
}
