// pages/chat/chat.js
Page({
  data: {
    statusBarHeight: 0,
    safeAreaInsetBottom: 0,
    peerName: '邻居',
    inputValue: '',
    scrollToId: '',
    messages: [
      {
        id: 1,
        from: 'other',
        text: '你好，请问还在吗？',
        time: '10:28',
        showTime: true
      },
      {
        id: 2,
        from: 'me',
        text: '在的，有需要可以聊。',
        time: '10:29',
        showTime: false
      }
    ]
  },

  onLoad(options) {
    const systemInfo = wx.getSystemInfoSync();
    const statusBarHeight = systemInfo.statusBarHeight || 0;
    const screenHeight = systemInfo.screenHeight;
    const safeAreaBottom = systemInfo.safeArea?.bottom || screenHeight;
    const safeAreaInsetBottom = screenHeight - safeAreaBottom;
    const peerName = options.name || '邻居';

    this.setData({
      statusBarHeight,
      safeAreaInsetBottom,
      peerName
    });

    this.scrollToBottom();
  },

  onBack() {
    wx.navigateBack();
  },

  onInput(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  onSend() {
    const text = (this.data.inputValue || '').trim();
    if (!text) return;

    const messages = this.data.messages.slice();
    const id = messages.length ? messages[messages.length - 1].id + 1 : 1;
    const time = this.formatTime(new Date());

    messages.push({
      id,
      from: 'me',
      text,
      time,
      showTime: true
    });

    this.setData({
      messages,
      inputValue: ''
    }, () => {
      this.scrollToBottom();
    });
  },

  scrollToBottom() {
    const messages = this.data.messages;
    if (!messages.length) return;
    const lastId = messages[messages.length - 1].id;
    this.setData({
      scrollToId: `msg-${lastId}`
    });
  },

  formatTime(date) {
    const h = `${date.getHours()}`.padStart(2, '0');
    const m = `${date.getMinutes()}`.padStart(2, '0');
    return `${h}:${m}`;
  }
});
