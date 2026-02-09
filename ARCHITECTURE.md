# 项目架构说明

## 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                    微信小程序框架                          │
├─────────────────────────────────────────────────────────┤
│                   TDesign 组件库                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │   页面层  │  │  组件层   │  │  工具层   │             │
│  └──────────┘  └──────────┘  └──────────┘             │
│       │              │              │                   │
│  ┌──────────────────────────────────────┐              │
│  │         数据层（LocalStorage）         │              │
│  └──────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────┘
```

## 层级结构

### 1. 页面层（Pages）

#### TabBar 页面（5个）
```
├── 社区页 (community)
│   ├── 社区切换入口
│   ├── 分类宫格
│   └── 信息流列表
│
├── 发现页 (discovery)
│   ├── 搜索框
│   ├── 范围切换
│   ├── 分类 Tab
│   └── 列表展示
│
├── 发布页 (publish)
│   └── 类型选择
│
├── 消息页 (messages)
│   ├── 私信列表
│   └── 通知列表
│
└── 我的页 (me)
    ├── 用户信息
    ├── 统计数据
    └── 功能入口
```

#### 二级页面（7个）
```
├── 详情页 (detail)
│   ├── 帖子详情
│   ├── 收藏功能
│   └── 私信入口
│
├── 社区选择 (community-select)
│   └── 社区列表
│
├── 发布表单 (publish-form)
│   ├── 通用字段
│   └── 类型特有字段
│
├── 聊天页 (chat)
│   ├── 消息列表
│   └── 发送消息
│
├── 我的发布 (my-posts)
│   ├── 状态筛选
│   └── 发布列表
│
├── 我的收藏 (my-favorites)
│   └── 收藏列表
│
└── 编辑资料 (edit-profile)
    ├── 头像选择
    └── 昵称编辑
```

### 2. 组件层（Components）

```
components/
├── system-avatar/      # 系统头像组件
│   ├── 支持3种尺寸
│   └── 错误处理
│
├── info-card/          # 信息卡片组件
│   ├── 显示帖子信息
│   ├── 时间格式化
│   └── 点击跳转详情
│
└── navigation-bar/     # 导航栏组件（已存在）
    └── 自定义导航栏
```

### 3. 工具层（Utils）

```
utils/
├── storage.js          # 本地存储管理
│   ├── getStorage()
│   ├── setStorage()
│   └── 预定义 KEYS
│
├── keyword-filter.js   # 关键词过滤
│   ├── checkSensitiveWords()
│   ├── checkNickname()
│   └── showSensitiveWordTip()
│
└── common.js          # 通用工具函数
    ├── formatTime()
    ├── generateId()
    ├── debounce()
    └── throttle()
```

### 4. 数据层（Data）

```
data/
├── communities.js      # 社区数据
│   └── 5个社区配置
│
├── posts.js           # 帖子数据
│   ├── CATEGORIES（分类定义）
│   ├── POST_STATUS（状态定义）
│   ├── MOCK_POSTS（8条Mock数据）
│   ├── getPosts()
│   └── getPostById()
│
└── avatars.js         # 头像数据
    ├── SYSTEM_AVATARS（8个预设头像）
    ├── getRandomAvatar()
    └── getAvatarByUserId()
```

## 数据流

### 发布流程
```
用户填写表单
    ↓
关键词过滤
    ↓
创建帖子对象
    ↓
保存到 MY_POSTS
    ↓
状态：审核中
    ↓
5秒后模拟审核
    ↓
├─ 通过 → 状态：已通过
└─ 驳回 → 状态：被驳回 + 驳回原因
    ↓
创建系统通知
    ↓
保存到 NOTIFICATIONS
```

### 私信流程
```
点击"私信TA"
    ↓
查找/创建会话
    ↓
进入聊天页
    ↓
发送消息
    ↓
关键词过滤
    ↓
添加到消息列表
    ↓
更新会话最后消息
    ↓
保存到 CONVERSATIONS
```

### 收藏流程
```
点击收藏按钮
    ↓
检查是否已收藏
    ↓
├─ 未收藏 → 添加到 FAVORITES
└─ 已收藏 → 从 FAVORITES 移除
    ↓
更新按钮状态
    ↓
更新收藏数量
```

## 存储结构

### LocalStorage Keys
```javascript
KEYS = {
  CURRENT_COMMUNITY: 'current_community',     // 当前社区
  DISCOVERY_RANGE: 'discovery_range',         // 发现页范围
  USER_INFO: 'user_info',                     // 用户信息
  MY_POSTS: 'my_posts',                       // 我的发布
  FAVORITES: 'favorites',                     // 收藏列表
  CONVERSATIONS: 'conversations',             // 会话列表
  NOTIFICATIONS: 'notifications'              // 通知列表
}
```

### 数据结构示例

#### 用户信息
```javascript
{
  id: 'u_1234567890',
  nickname: '用户1234',
  avatar: '/assets/avatars/avatar-1.png'
}
```

#### 帖子对象
```javascript
{
  id: 'p1',
  category: 'rent',
  title: '阳光花园两室一厅出租',
  description: '精装修，拎包入住...',
  images: ['/assets/images/rent-1.jpg'],
  communityId: 'c1',
  district: 'A区',
  authorId: 'u1',
  authorName: '李先生',
  createdAt: 1234567890000,
  status: 'approved',
  params: {
    rent: '2500元/月',
    roomType: '2室1厅',
    area: '85㎡',
    floor: '6/18层'
  }
}
```

#### 会话对象
```javascript
{
  id: 'conv_1234567890',
  userId: 'u1',
  userName: '李先生',
  postId: 'p1',
  postTitle: '阳光花园两室一厅出租',
  lastMessage: '您好，房子还在吗？',
  lastMessageTime: 1234567890000,
  unread: false,
  unreadCount: 0,
  messages: [
    {
      id: 'm1',
      content: '您好，房子还在吗？',
      senderId: 'u2',
      senderName: '张三',
      createdAt: 1234567890000,
      isSelf: true
    }
  ]
}
```

#### 通知对象
```javascript
{
  id: 'n1',
  type: 'approved',  // approved 或 rejected
  title: '审核通过',
  content: '您的帖子"xxx"已审核通过',
  postId: 'p1',
  createdAt: 1234567890000,
  read: false
}
```

## 路由结构

```
TabBar 路由:
├── /pages/community/community
├── /pages/discovery/discovery
├── /pages/publish/publish
├── /pages/messages/messages
└── /pages/me/me

二级页面路由:
├── /pages/detail/detail?id={postId}
├── /pages/community-select/community-select
├── /pages/publish-form/publish-form?category={category}
├── /pages/chat/chat?conversationId={conversationId}
├── /pages/my-posts/my-posts
├── /pages/my-favorites/my-favorites
└── /pages/edit-profile/edit-profile
```

## TDesign 组件使用清单

| 组件 | 使用位置 | 用途 |
|------|---------|------|
| t-tabs / t-tab-panel | 发现页、消息页、我的发布 | 标签页切换 |
| t-search | 发现页 | 搜索框 |
| t-input | 发布表单、聊天、编辑资料 | 文本输入 |
| t-textarea | 发布表单 | 多行文本输入 |
| t-button | 所有页面 | 按钮 |
| t-picker | 发布表单 | 片区选择 |
| t-tag | 信息卡片、详情页、我的发布 | 标签显示 |
| t-empty | 所有列表页 | 空状态 |
| t-loading | 社区页、发现页 | 加载状态 |
| t-icon | 详情页、社区选择等 | 图标 |
| t-popup | 编辑资料 | 弹窗 |
| t-cell / t-cell-group | 我的页 | 列表单元格 |
| t-badge | 消息页 | 未读标记 |

## 性能优化要点

### 1. 数据管理
- 使用 LocalStorage 持久化数据
- 避免频繁读写存储
- 数据按需加载

### 2. 渲染优化
- 使用 `wx:if` 而非 `hidden`（不常切换时）
- 列表使用 `wx:key` 优化
- 避免过深的组件嵌套

### 3. 事件处理
- 使用 `catchtap` 阻止冒泡（需要时）
- 避免在 `onShow` 中做大量操作
- 使用防抖/节流优化频繁操作

### 4. 图片优化
- 使用合适的 mode 属性
- 压缩图片大小
- 懒加载（长列表时）

## 安全措施

### 1. 关键词过滤
- 发布内容过滤
- 私信内容过滤
- 昵称过滤
- 阻止提交并提示用户

### 2. 数据校验
- 必填字段验证
- 长度限制
- 格式验证

### 3. 隐私保护
- 不显示真实联系方式
- 位置仅到社区+片区
- 仅站内私信

## 扩展性考虑

### 1. API 对接
预留了数据层接口，便于后续对接后端：
- `getPosts()` → API: GET /posts
- `getPostById()` → API: GET /posts/:id
- 提交发布 → API: POST /posts
- 发送私信 → API: POST /messages

### 2. 功能扩展
模块化设计，便于添加新功能：
- 新增分类：在 CATEGORIES 中添加
- 新增社区：在 COMMUNITIES 中添加
- 新增页面：在 pages 目录创建并在 app.json 注册

### 3. 组件复用
公共组件可在多处使用：
- system-avatar：头像显示
- info-card：列表展示
- 可继续封装更多组件

## 总结

本项目采用分层架构设计，各层职责清晰：
- **页面层**：负责UI展示和用户交互
- **组件层**：提供可复用的UI组件
- **工具层**：提供通用功能函数
- **数据层**：管理应用数据和业务逻辑

通过合理的架构设计，项目具有良好的可维护性和可扩展性。
