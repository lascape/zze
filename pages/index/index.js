// index.js
Page({
  data: {
    statusBarHeight: 0,
    navBarHeight: 44,
    currentCommunity: "锦绣社区",
    currentTab: "community",
    unreadCount: 2,
    searchValue: "",

    // 分类数据
    categories: [
      {
        id: "rental",
        name: "本地租房",
        icon: "home",
        iconColor: "#3B82F6",
        bgColor: "#EFF6FF",
        color: "blue",
      },
      {
        id: "food",
        name: "周边美食",
        icon: "fork",
        iconColor: "#F97316",
        bgColor: "#FFF7ED",
        color: "orange",
      },
      {
        id: "used",
        name: "二手闲置",
        icon: "cart",
        iconColor: "#10B981",
        bgColor: "#ECFDF5",
        color: "green",
      },
      {
        id: "service",
        name: "生活服务",
        icon: "service",
        iconColor: "#A855F7",
        bgColor: "#FAF5FF",
        color: "purple",
      },
    ],

    // 动态列表数据（社区页）
    posts: [
      {
        id: "p1",
        type: "rental",
        author: "邻居1267",
        time: "2小时前",
        category: "租房",
        title: "【转租】精装两居室，采光好，近公交",
        content: "工作变动急转，家电齐全，随时可看房。仅站内私信沟通。",
        price: 3500,
        location: "锦绣社区·东区",
        rentType: "整租",
        layout: "两室一厅",
        images: [
          "https://dummyimage.com/200x200/fff/000",
          "https://dummyimage.com/200x200/eee/000",
        ],
        liked: false,
        likes: 12,
        comments: 3,
      },
      {
        id: "p2",
        type: "used",
        author: "邻居3902",
        time: "昨天",
        category: "二手",
        title: "9成新婴儿推车，轻便可折叠",
        content: "买来用过几次，小区自提，欢迎私信。",
        price: 280,
        location: "锦绣社区·西区",
        quality: "9成新",
        images: [
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
          "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400",
          "https://images.unsplash.com/photo-1555412654-72a95a495858?w=400",
        ],
        liked: false,
        likes: 8,
        comments: 5,
      },
      {
        id: "p3",
        type: "food",
        author: "邻居7701",
        time: "3天前",
        category: "美食",
        title: "小区门口新开的拉面店，性价比很高",
        content: "汤底很香，人均25左右，晚高峰要排队。",
        location: "海棠花园·北门",
        perCapita: 25,
        foodCategory: "面食",
        images: [
          "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
        ],
        liked: false,
        likes: 25,
        comments: 12,
      },
      {
        id: "p4",
        type: "service",
        author: "邻居2150",
        time: "1周前",
        category: "服务",
        title: "上门家电清洗（空调/油烟机）",
        content: "预约上门，按台收费，具体看型号。仅站内沟通。",
        location: "锦绣社区·东区",
        serviceType: "家电清洗",
        refPrice: "¥99起",
        images: [],
        liked: false,
        likes: 6,
        comments: 2,
      },
    ],

    // 发现页相关数据
    filterOptions: {
      rental: [
        { label: "整租", value: "whole" },
        { label: "合租", value: "shared" },
        { label: "一居", value: "1br" },
        { label: "两居", value: "2br" },
        { label: "三居", value: "3br" },
      ],
      food: [
        { label: "面食", value: "noodles" },
        { label: "快餐", value: "fast" },
        { label: "火锅", value: "hotpot" },
        { label: "烧烤", value: "bbq" },
        { label: "甜品", value: "dessert" },
      ],
      used: [
        { label: "家电", value: "appliance" },
        { label: "家具", value: "furniture" },
        { label: "母婴", value: "baby" },
        { label: "图书", value: "books" },
        { label: "数码", value: "digital" },
      ],
      service: [
        { label: "家政", value: "housekeeping" },
        { label: "维修", value: "repair" },
        { label: "配送", value: "delivery" },
        { label: "教育", value: "education" },
      ],
    },
    discoverSearchValue: "",
    discoverActiveTab: "rental",
    selectedFilters: [],
    currentFilters: [],
    discoverPosts: [],

    // 消息数据
    chats: [
      {
        id: "chat1",
        peerName: "张三",
        lastMsg: "房子还在吗？",
        unread: 2,
      },
      {
        id: "chat2",
        peerName: "李四",
        lastMsg: "好的，谢谢",
        unread: 0,
      },
    ],
    notices: [
      {
        id: "notice1",
        title: "您发布的帖子已通过审核",
        time: "2024-03-20 10:30",
      },
      {
        id: "notice2",
        title: "系统消息：社区规范更新",
        time: "2024-03-19 15:20",
      },
    ],

    // 个人信息数据
    nickname: "邻居4821",

    // 发布相关
    showPublishModal: false,
  },

  onLoad() {
    console.log("页面加载");
    this.getSystemInfo();
  },

  // 获取系统信息
  getSystemInfo() {
    const systemInfo = wx.getSystemInfoSync();
    const { screenHeight, safeArea } = systemInfo;
    const statusBarHeight = systemInfo.statusBarHeight || 0;
    const bottomSafeHeight = screenHeight - safeArea.bottom ;
    console.log("状态栏高度:", statusBarHeight);
    console.log("底部安全区域高度:", bottomSafeHeight);
    console.log("==== 系统信息 ====");
    console.log(systemInfo);

    this.setData({
      statusBarHeight: statusBarHeight,
      bottomSafeHeight: bottomSafeHeight,
    });
  },

  // 顶部导航操作
  onCommunityTap() {
    wx.showToast({
      title: "切换社区",
      icon: "none",
    });
  },

  onSearchChange(e) {
    this.setData({
      searchValue: e.detail.value,
    });
  },

  onSearchSubmit(e) {
    const keyword = e.detail.value;
    if (keyword.trim()) {
      wx.showToast({
        title: `搜索: ${keyword}`,
        icon: "none",
      });
    }
  },

  onSearchClear() {
    this.setData({
      searchValue: "",
    });
  },

  onNotificationTap() {
    wx.showToast({
      title: "通知中心",
      icon: "none",
    });
  },

  // Banner操作
  onDiscoverTap() {
    this.setData({
      currentTab: "discover",
    });
    wx.showToast({
      title: "发现附近30km",
      icon: "none",
    });
  },

  // 分类点击
  onCategoryTap(e) {
    const type = e.currentTarget.dataset.type;
    wx.showToast({
      title: `查看${type}分类`,
      icon: "none",
    });
  },

  // 查看更多
  onMoreTap() {
    wx.showToast({
      title: "查看更多动态",
      icon: "none",
    });
  },

  // 帖子点击
  onPostTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: `查看帖子详情: ${id}`,
      icon: "none",
    });
  },

  // 点赞
  onLikeTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: "点赞成功",
      icon: "success",
    });
  },

  // 评论
  onCommentTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: "评论功能",
      icon: "none",
    });
  },

  // 收藏
  onFavoriteTap(e) {
    const id = e.currentTarget.dataset.id;
    const posts = this.data.posts;
    const index = posts.findIndex((p) => p.id === id);

    if (index !== -1) {
      posts[index].favorited = !posts[index].favorited;
      this.setData({ posts });

      wx.showToast({
        title: posts[index].favorited ? "已收藏" : "已取消收藏",
        icon: "success",
      });
    }
  },

  // 联系/查看详情
  onContactTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: "查看详情",
      icon: "none",
    });
  },

  // 底部导航切换
  onTabChange(e) {
    const tab = e.detail.value;

    // 如果点击发布，不切换 tab，只打开弹窗
    if (tab === "publish") {
      this.setData({
        showPublishModal: true,
      });
      return;
    }

    this.setData({
      currentTab: tab,
    });

    // 如果切换到发现页，加载发现页数据
    if (tab === "discover") {
      this.loadDiscoverPosts();
    }
  },

  // 发布按钮 - 打开发布类型选择弹窗
  onPublishTap() {
    this.setData({
      showPublishModal: true,
    });
  },

  // 发布选择弹窗可见性变化
  onPublishModalChange(e) {
    this.setData({
      showPublishModal: e.detail.visible,
    });
  },

  // 选择发布类型
  onPublishTypeTap(e) {
    const type = e.detail.type;
    this.setData({
      showPublishModal: false,
    });
    // 跳转到发布表单页面
    wx.navigateTo({
      url: `/pages/post-form/post-form?type=${type}`,
    });
  },

  // 关闭发布表单
  onClosePostForm() {
    this.setData({
      showPostForm: false,
      currentPostType: "",
    });
  },

  // 提交发布
  onPostSubmit(e) {
    const { formData, postType } = e.detail;
    console.log("提交发布", postType, formData);
    this.setData({
      showPostForm: false,
      currentPostType: "",
    });
  },

  // 保存草稿
  onPostDraft(e) {
    const { formData } = e.detail;
    console.log("保存草稿", formData);
    this.setData({
      showPostForm: false,
      currentPostType: "",
    });
  },

  // Discover相关方法
  loadDiscoverPosts() {
    const { discoverActiveTab, posts } = this.data;
    const filteredPosts = posts.filter((p) => p.type === discoverActiveTab);

    this.setData({
      discoverPosts: filteredPosts,
      currentFilters: this.data.filterOptions[discoverActiveTab] || [],
    });
  },

  onDiscoverSearchChange(e) {
    this.setData({
      discoverSearchValue: e.detail.value,
    });
  },

  onDiscoverSearchSubmit(e) {
    const keyword = e.detail.value;
    if (keyword.trim()) {
      wx.showToast({
        title: `搜索: ${keyword}`,
        icon: "none",
      });
    }
  },

  onDiscoverTabChange(e) {
    const tab = e.detail.value;
    this.setData({
      discoverActiveTab: tab,
      selectedFilters: [],
    });
    this.loadDiscoverPosts();
  },

  onFilterTap(e) {
    const value = e.detail.value;
    let { selectedFilters } = this.data;

    const index = selectedFilters.indexOf(value);
    if (index > -1) {
      selectedFilters.splice(index, 1);
    } else {
      selectedFilters.push(value);
    }

    this.setData({
      selectedFilters: selectedFilters,
    });
  },

  onResetFilter() {
    this.setData({
      selectedFilters: [],
    });
    this.loadDiscoverPosts();
  },

  onSortTap() {
    wx.showActionSheet({
      itemList: ["按时间排序", "按价格排序", "按距离排序"],
      success: (res) => {
        wx.showToast({
          title: `选择了第${res.tapIndex + 1}个`,
          icon: "none",
        });
      },
    });
  },

  // 消息页事件处理
  onChatTap(e) {
    const id = e.detail.id;
    const chat = this.data.chats.find(item => item.id === id);
    const name = chat ? chat.peerName : "邻居";
    wx.navigateTo({
      url: `/pages/chat/chat?id=${id}&name=${encodeURIComponent(name)}`
    });
  },

  onSafetyTipsTap() {
    wx.showToast({
      title: "查看沟通规范",
      icon: "none",
    });
  },

  // 个人中心页事件处理
  onEditNicknameTap() {
    wx.showModal({
      title: "修改昵称",
      editable: true,
      placeholderText: "请输入新昵称（2-12字符）",
      content: this.data.nickname,
      success: (res) => {
        if (res.confirm && res.content) {
          const newNickname = res.content.trim();
          if (newNickname.length < 2 || newNickname.length > 12) {
            wx.showToast({
              title: "昵称长度需2-12字符",
              icon: "none",
            });
            return;
          }
          if (/(vx|微信|电话|中介|加微|同号|二维码|http)/i.test(newNickname)) {
            wx.showToast({
              title: "昵称含敏感内容",
              icon: "none",
            });
            return;
          }
          this.setData({
            nickname: newNickname,
          });
          wx.showToast({
            title: "昵称已更新",
            icon: "success",
          });
        }
      },
    });
  },

  onMyPostsTap() {
    wx.showToast({
      title: "我的发布",
      icon: "none",
    });
  },

  onFavoritesTap() {
    wx.showToast({
      title: "我的收藏",
      icon: "none",
    });
  },

  onProfileSafetyTap() {
    wx.showModal({
      title: "发布与沟通规范",
      content:
        "1. 禁止留微信/电话等联系方式\n2. 仅站内私信沟通\n3. 禁止发布违法违规信息\n4. 保护个人隐私安全",
      showCancel: false,
      confirmText: "知道了",
    });
  },
});
