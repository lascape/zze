// 聊天页
const { getStorage, setStorage, KEYS } = require('../../utils/storage.js')
const { checkSensitiveWords, showSensitiveWordTip } = require('../../utils/keyword-filter.js')
const { getAvatarByUserId } = require('../../data/avatars.js')
const { generateId } = require('../../utils/common.js')

Page({
  data: {
    conversationId: '',
    conversation: null,
    messages: [],
    inputValue: '',
    userAvatar: ''
  },

  onLoad(options) {
    const { conversationId } = options
    if (conversationId) {
      this.setData({ conversationId })
      this.loadConversation()
    }
  },

  loadConversation() {
    const conversations = getStorage(KEYS.CONVERSATIONS) || []
    const conversation = conversations.find(c => c.id === this.data.conversationId)
    
    if (conversation) {
      const app = getApp()
      const userInfo = app.globalData.userInfo
      
      this.setData({
        conversation,
        messages: conversation.messages || [],
        userAvatar: getAvatarByUserId(conversation.userId)
      })
      
      // 标记为已读
      conversation.unread = false
      conversation.unreadCount = 0
      setStorage(KEYS.CONVERSATIONS, conversations)
    }
  },

  onInputChange(e) {
    this.setData({ inputValue: e.detail.value })
  },

  onSendMessage() {
    const { inputValue, conversationId, messages } = this.data
    
    if (!inputValue.trim()) {
      return
    }
    
    // 检查敏感词
    const check = checkSensitiveWords(inputValue)
    if (!check.valid) {
      showSensitiveWordTip(check.keyword)
      return
    }
    
    const app = getApp()
    const userInfo = app.globalData.userInfo
    
    const message = {
      id: generateId(),
      content: inputValue,
      senderId: userInfo.id,
      senderName: userInfo.nickname,
      createdAt: Date.now(),
      isSelf: true
    }
    
    messages.push(message)
    
    // 更新会话
    let conversations = getStorage(KEYS.CONVERSATIONS) || []
    const conversation = conversations.find(c => c.id === conversationId)
    if (conversation) {
      conversation.messages = messages
      conversation.lastMessage = inputValue
      conversation.lastMessageTime = Date.now()
      setStorage(KEYS.CONVERSATIONS, conversations)
    }
    
    this.setData({
      messages,
      inputValue: ''
    })
    
    // 滚动到底部
    setTimeout(() => {
      wx.pageScrollTo({
        scrollTop: 999999,
        duration: 300
      })
    }, 100)
  }
})
