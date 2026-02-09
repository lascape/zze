// 消息页
const { getStorage, KEYS } = require('../../utils/storage.js')
const { formatTime } = require('../../utils/common.js')
const { getAvatarByUserId } = require('../../data/avatars.js')

Page({
  data: {
    activeTab: 'conversations', // conversations 或 notifications
    conversations: [],
    notifications: [],
    unreadCount: 0
  },

  onLoad() {
    this.loadConversations()
    this.loadNotifications()
  },

  onShow() {
    this.loadConversations()
    this.loadNotifications()
  },

  loadConversations() {
    const conversations = getStorage(KEYS.CONVERSATIONS) || []
    const enrichedConversations = conversations.map(conv => ({
      ...conv,
      avatar: getAvatarByUserId(conv.userId),
      timeStr: formatTime(conv.lastMessageTime)
    }))
    this.setData({ conversations: enrichedConversations })
    this.updateUnreadCount()
  },

  loadNotifications() {
    const notifications = getStorage(KEYS.NOTIFICATIONS) || []
    const enrichedNotifications = notifications.map(notif => ({
      ...notif,
      timeStr: formatTime(notif.createdAt)
    }))
    this.setData({ notifications: enrichedNotifications })
    this.updateUnreadCount()
  },

  updateUnreadCount() {
    const conversations = this.data.conversations
    const notifications = this.data.notifications
    const unreadCount = 
      conversations.filter(c => c.unread).length + 
      notifications.filter(n => !n.read).length
    this.setData({ unreadCount })
  },

  onTabChange(e) {
    this.setData({ activeTab: e.currentTarget.dataset.tab })
  },

  onConversationTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/chat/chat?conversationId=${id}`
    })
  },

  onNotificationTap(e) {
    const { index } = e.currentTarget.dataset
    const notifications = this.data.notifications
    notifications[index].read = true
    this.setData({ notifications })
    // 保存到本地存储
    const allNotifications = getStorage(KEYS.NOTIFICATIONS) || []
    allNotifications[index].read = true
    wx.setStorageSync(KEYS.NOTIFICATIONS, allNotifications)
    this.updateUnreadCount()
  }
})
