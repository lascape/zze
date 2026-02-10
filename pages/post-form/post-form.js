// pages/post-form/post-form.js
Page({
  data: {
    statusBarHeight: 0,
    postType: '',
    formTitle: '发布',
    formData: {
      community: '锦绣社区',
      area: '',
      title: '',
      desc: '',
      images: 0
    },
    rentTypes: ['整租', '合租'],
    rentTypeIndex: -1,
    qualities: ['全新', '95新', '9成新', '8成新'],
    qualityIndex: -1
  },

  onLoad(options) {
    const systemInfo = wx.getSystemInfoSync();
    const statusBarHeight = systemInfo.statusBarHeight || 0;
    
    const postType = options.type || '';
    this.setData({
      statusBarHeight,
      postType
    });
    this.updateFormTitle();
  },

  updateFormTitle() {
    const titleMap = {
      rental: '发布租房',
      food: '发布美食',
      used: '发布二手',
      service: '发布服务'
    };
    this.setData({
      formTitle: titleMap[this.data.postType] || '发布'
    });
  },

  onBackTap() {
    wx.navigateBack();
  },

  onCommunityTap() {
    wx.showToast({
      title: '选择社区',
      icon: 'none'
    });
  },

  onAreaInput(e) {
    this.setData({
      'formData.area': e.detail.value
    });
  },

  onTitleInput(e) {
    this.setData({
      'formData.title': e.detail.value
    });
  },

  onDescInput(e) {
    this.setData({
      'formData.desc': e.detail.value
    });
  },

  onPriceInput(e) {
    this.setData({
      'formData.price': e.detail.value
    });
  },

  onRentTypeChange(e) {
    const index = e.detail.value;
    this.setData({
      rentTypeIndex: index,
      'formData.rentType': this.data.rentTypes[index]
    });
  },

  onLayoutInput(e) {
    this.setData({
      'formData.layout': e.detail.value
    });
  },

  onShopNameInput(e) {
    this.setData({
      'formData.shopName': e.detail.value
    });
  },

  onCategoryInput(e) {
    this.setData({
      'formData.category': e.detail.value
    });
  },

  onPerCapitaInput(e) {
    this.setData({
      'formData.perCapita': e.detail.value
    });
  },

  onQualityChange(e) {
    const index = e.detail.value;
    this.setData({
      qualityIndex: index,
      'formData.quality': this.data.qualities[index]
    });
  },

  onServiceTypeInput(e) {
    this.setData({
      'formData.serviceType': e.detail.value
    });
  },

  onRefPriceInput(e) {
    this.setData({
      'formData.refPrice': e.detail.value
    });
  },

  onImageDecrease() {
    const current = this.data.formData.images || 0;
    if (current > 0) {
      this.setData({
        'formData.images': current - 1
      });
    }
  },

  onImageIncrease() {
    const current = this.data.formData.images || 0;
    this.setData({
      'formData.images': current + 1
    });
  },

  onSubmitTap() {
    const { formData, postType } = this.data;
    
    // 基础验证
    if (!formData.title || !formData.desc) {
      wx.showToast({
        title: '请填写必填项',
        icon: 'none'
      });
      return;
    }

    // 类型特定验证
    if (postType === 'rental' && (!formData.price || !formData.rentType || !formData.layout)) {
      wx.showToast({
        title: '请完善租房信息',
        icon: 'none'
      });
      return;
    }

    if (postType === 'food' && (!formData.shopName || !formData.category)) {
      wx.showToast({
        title: '请完善美食信息',
        icon: 'none'
      });
      return;
    }

    if (postType === 'used' && (!formData.price || !formData.quality)) {
      wx.showToast({
        title: '请完善二手信息',
        icon: 'none'
      });
      return;
    }

    if (postType === 'service' && !formData.serviceType) {
      wx.showToast({
        title: '请填写服务类型',
        icon: 'none'
      });
      return;
    }

    wx.showToast({
      title: '提交成功，等待审核',
      icon: 'success'
    });

    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  },

  onDraftTap() {
    wx.showToast({
      title: '已保存草稿',
      icon: 'success'
    });
    setTimeout(() => {
      wx.navigateBack();
    }, 1000);
  }
});