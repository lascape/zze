// pages/discover/discover.js
Component({
  properties: {
    searchValue: {
      type: String,
      value: ''
    },
    activeTab: {
      type: String,
      value: 'rental'
    },
    currentFilters: {
      type: Array,
      value: []
    },
    selectedFilters: {
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

    onTabChange(e) {
      this.triggerEvent('tabchange', e.detail);
    },

    onFilterTap(e) {
      this.triggerEvent('filtertap', { value: e.currentTarget.dataset.value });
    },

    onResetFilter() {
      this.triggerEvent('resetfilter');
    },

    onSortTap() {
      this.triggerEvent('sorttap');
    },

    onPostTap(e) {
      this.triggerEvent('posttap', { id: e.currentTarget.dataset.id });
    },

    onContactTap(e) {
      this.triggerEvent('contacttap', { id: e.currentTarget.dataset.id });
    }
  }
});
