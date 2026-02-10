// pages/messages/messages.js
Component({
  properties: {
    chats: {
      type: Array,
      value: []
    },
    notices: {
      type: Array,
      value: []
    }
  },

  data: {
    activeTab: 'chat'
  },

  methods: {
    onTabSwitch(e) {
      const tab = e.currentTarget.dataset.tab;
      this.setData({
        activeTab: tab
      });
    },

    onChatTap(e) {
      const id = e.currentTarget.dataset.id;
      this.triggerEvent('chattap', { id });
    },

    onSafetyTipsTap() {
      this.triggerEvent('safetytipstap');
    }
  }
});
