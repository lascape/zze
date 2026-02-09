// app.js
const { COMMUNITIES } = require('./data/communities.js')
const { getStorage, setStorage, KEYS } = require('./utils/storage.js')
const { getRandomAvatar } = require('./data/avatars.js')

App({
  globalData: {
    userInfo: null,
    currentCommunity: null
  },

  onLaunch() {
    // 初始化用户信息
    let userInfo = getStorage(KEYS.USER_INFO)
    if (!userInfo) {
      userInfo = {
        id: 'u_' + Date.now(),
        nickname: '用户' + Math.floor(Math.random() * 10000),
        avatar: getRandomAvatar()
      }
      setStorage(KEYS.USER_INFO, userInfo)
    }
    this.globalData.userInfo = userInfo

    // 初始化当前社区（默认第一个）
    let currentCommunity = getStorage(KEYS.CURRENT_COMMUNITY)
    if (!currentCommunity) {
      currentCommunity = COMMUNITIES[0]
      setStorage(KEYS.CURRENT_COMMUNITY, currentCommunity)
    }
    this.globalData.currentCommunity = currentCommunity

    // 初始化发现页范围（默认附近30km）
    let discoveryRange = getStorage(KEYS.DISCOVERY_RANGE)
    if (!discoveryRange) {
      discoveryRange = 'nearby'
      setStorage(KEYS.DISCOVERY_RANGE, discoveryRange)
    }

    // 初始化收藏列表
    let favorites = getStorage(KEYS.FAVORITES)
    if (!favorites) {
      setStorage(KEYS.FAVORITES, [])
    }

    // 初始化我的发布
    let myPosts = getStorage(KEYS.MY_POSTS)
    if (!myPosts) {
      setStorage(KEYS.MY_POSTS, [])
    }

    // 初始化通知列表
    let notifications = getStorage(KEYS.NOTIFICATIONS)
    if (!notifications) {
      setStorage(KEYS.NOTIFICATIONS, [])
    }

    // 初始化会话列表
    let conversations = getStorage(KEYS.CONVERSATIONS)
    if (!conversations) {
      setStorage(KEYS.CONVERSATIONS, [])
    }
  }
})
