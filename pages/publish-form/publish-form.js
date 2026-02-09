// 发布表单页
const { CATEGORIES } = require('../../data/posts.js')
const { COMMUNITIES } = require('../../data/communities.js')
const { getStorage, setStorage, KEYS } = require('../../utils/storage.js')
const { checkSensitiveWords, showSensitiveWordTip } = require('../../utils/keyword-filter.js')
const { generateId } = require('../../utils/common.js')

Page({
  data: {
    category: '',
    categoryName: '',
    currentCommunity: null,
    districtOptions: [],
    formData: {
      title: '',
      description: '',
      district: '',
      images: []
    },
    // 租房特有字段
    rent: '',
    roomType: '',
    area: '',
    floor: '',
    // 美食特有字段
    avgPrice: '',
    cuisine: '',
    // 二手特有字段
    price: '',
    condition: '',
    brand: '',
    // 服务特有字段
    serviceType: '',
    experience: ''
  },

  onLoad(options) {
    const { category } = options
    const categoryInfo = CATEGORIES[category.toUpperCase()]
    const currentCommunity = getStorage(KEYS.CURRENT_COMMUNITY)
    
    this.setData({
      category,
      categoryName: categoryInfo?.name || '',
      currentCommunity,
      districtOptions: currentCommunity?.districts || []
    })
  },

  onInputChange(e) {
    const { field } = e.currentTarget.dataset
    const { value } = e.detail
    this.setData({
      [field]: value
    })
  },

  onFormDataChange(e) {
    const { field } = e.currentTarget.dataset
    const { value } = e.detail
    this.setData({
      [`formData.${field}`]: value
    })
  },

  onDistrictChange(e) {
    const { value } = e.detail
    this.setData({
      'formData.district': this.data.districtOptions[value]
    })
  },

  onChooseImage() {
    const maxImages = 3
    const currentImages = this.data.formData.images
    
    wx.chooseImage({
      count: maxImages - currentImages.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const newImages = [...currentImages, ...res.tempFilePaths]
        this.setData({
          'formData.images': newImages
        })
      }
    })
  },

  onRemoveImage(e) {
    const { index } = e.currentTarget.dataset
    const images = this.data.formData.images
    images.splice(index, 1)
    this.setData({
      'formData.images': images
    })
  },

  onSubmit() {
    const { category, formData } = this.data
    
    // 验证必填字段
    if (!formData.title.trim()) {
      wx.showToast({ title: '请输入标题', icon: 'none' })
      return
    }
    
    if (!formData.description.trim()) {
      wx.showToast({ title: '请输入描述', icon: 'none' })
      return
    }
    
    if (!formData.district) {
      wx.showToast({ title: '请选择片区', icon: 'none' })
      return
    }
    
    // 检查敏感词
    const titleCheck = checkSensitiveWords(formData.title)
    if (!titleCheck.valid) {
      showSensitiveWordTip(titleCheck.keyword)
      return
    }
    
    const descCheck = checkSensitiveWords(formData.description)
    if (!descCheck.valid) {
      showSensitiveWordTip(descCheck.keyword)
      return
    }
    
    // 构建参数对象
    const params = {}
    if (category === 'rent') {
      params.rent = this.data.rent
      params.roomType = this.data.roomType
      params.area = this.data.area
      params.floor = this.data.floor
    } else if (category === 'food') {
      params.avgPrice = this.data.avgPrice
      params.cuisine = this.data.cuisine
    } else if (category === 'secondhand') {
      params.price = this.data.price
      params.condition = this.data.condition
      params.brand = this.data.brand
    } else if (category === 'service') {
      params.serviceType = this.data.serviceType
      params.experience = this.data.experience
    }
    
    // 创建帖子
    const app = getApp()
    const userInfo = app.globalData.userInfo
    const currentCommunity = this.data.currentCommunity
    
    const post = {
      id: generateId(),
      category,
      title: formData.title,
      description: formData.description,
      images: formData.images,
      communityId: currentCommunity.id,
      district: formData.district,
      authorId: userInfo.id,
      authorName: userInfo.nickname,
      createdAt: Date.now(),
      status: 'pending', // 审核中
      params
    }
    
    // 保存到本地存储
    let myPosts = getStorage(KEYS.MY_POSTS) || []
    myPosts.unshift(post)
    setStorage(KEYS.MY_POSTS, myPosts)
    
    // 模拟审核流程（3秒后随机通过或驳回）
    this.simulateReview(post.id)
    
    wx.showToast({
      title: '发布成功，等待审核',
      icon: 'success'
    })
    
    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  },

  // 模拟审核流程
  simulateReview(postId) {
    setTimeout(() => {
      let myPosts = getStorage(KEYS.MY_POSTS) || []
      const post = myPosts.find(p => p.id === postId)
      
      if (post && post.status === 'pending') {
        // 80%概率通过
        const approved = Math.random() > 0.2
        post.status = approved ? 'approved' : 'rejected'
        
        if (!approved) {
          const reasons = [
            '标题或描述不够清晰，请补充更多信息',
            '图片质量不佳，建议重新上传',
            '信息内容不符合社区规范'
          ]
          post.rejectReason = reasons[Math.floor(Math.random() * reasons.length)]
        }
        
        setStorage(KEYS.MY_POSTS, myPosts)
        
        // 添加系统通知
        let notifications = getStorage(KEYS.NOTIFICATIONS) || []
        notifications.unshift({
          id: generateId(),
          type: approved ? 'approved' : 'rejected',
          title: approved ? '审核通过' : '审核未通过',
          content: approved ? `您的帖子"${post.title}"已审核通过` : `您的帖子"${post.title}"未通过审核：${post.rejectReason}`,
          postId: post.id,
          createdAt: Date.now(),
          read: false
        })
        setStorage(KEYS.NOTIFICATIONS, notifications)
      }
    }, 5000) // 5秒后审核
  }
})
