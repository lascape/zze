// pages/community/community.js
Component({
  properties: {
    searchValue: {
      type: String,
      value: ''
    },
    categories: {
      type: Array,
      value: []
    },
    posts: {
      type: Array,
      value: []
    }
  },

  methods: {
    onSearchChange(e) {
      this.triggerEvent('searchchange', e.detail);
    },

    onSearchSubmit(e) {
      this.triggerEvent('searchsubmit', e.detail);
    },

    onSearchClear(e) {
      this.triggerEvent('searchclear', e.detail);
    },

    onCategoryTap(e) {
      this.triggerEvent('categorytap', { id: e.currentTarget.dataset.id });
    },

    onPostTap(e) {
      this.triggerEvent('posttap', { id: e.currentTarget.dataset.id });
    },

    onLikeTap(e) {
      this.triggerEvent('liketap', { id: e.currentTarget.dataset.id });
    },

    onCommentTap(e) {
      this.triggerEvent('commenttap', { id: e.currentTarget.dataset.id });
    },

    onContactTap(e) {
      this.triggerEvent('contacttap', { id: e.currentTarget.dataset.id });
    }
  }
});
