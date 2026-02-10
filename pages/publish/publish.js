// pages/publish/publish.js
Component({
  methods: {
    onTypeTap(e) {
      const type = e.currentTarget.dataset.type;
      this.triggerEvent('typetap', { type });
    }
  }
});
