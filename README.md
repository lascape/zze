# 社区信息板小程序

使用 TDesign 微信小程序组件库开发的社区动态页面。

## 功能特性

✅ 顶部导航栏 - 社区切换、搜索、通知
✅ Banner 卡片 - 橙色渐变设计
✅ 分类导航 - 本地租房、周边美食、二手闲置、生活服务
✅ 动态列表 - 展示社区帖子信息
✅ 底部导航栏 - 五个Tab切换
✅ 交互功能 - 点赞、评论、收藏

## 技术栈

- 微信小程序
- TDesign 组件库
- Skyline 渲染引擎

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 构建 npm

在微信开发者工具中：
- 点击菜单栏的 "工具"
- 选择 "构建 npm"
- 等待构建完成

### 3. 运行项目

在微信开发者工具中打开项目即可预览。

## 项目结构

```
miniprogram-2/
├── pages/
│   └── index/
│       ├── index.wxml    # 页面结构
│       ├── index.wxss    # 页面样式
│       ├── index.js      # 页面逻辑
│       └── index.json    # 页面配置
├── components/
│   └── navigation-bar/   # 自定义导航栏组件
├── app.js
├── app.json
├── app.wxss
└── package.json
```

## 主要组件

### TDesign 组件使用

- `t-icon` - 图标组件
- `t-tag` - 标签组件
- `t-badge` - 徽章组件
- `t-grid` / `t-grid-item` - 宫格组件
- `t-image` - 图片组件
- `t-button` - 按钮组件

### 页面模块

1. **顶部导航** - 社区选择、搜索、通知功能
2. **Banner卡片** - 引导用户发现附近30km信息
3. **分类入口** - 快速进入不同类别的信息
4. **动态列表** - 展示各类社区信息帖子
5. **底部导航** - 切换不同功能模块

## 数据结构

### 帖子数据示例

```javascript
{
  id: 'p1',
  type: 'rental',           // 类型：rental/food/used/service
  authorName: '邻居1267',
  time: '2小时前',
  communityName: '锦绣社区',
  area: '东区',
  title: '【转租】精装两居室，采光好，近公交',
  desc: '工作变动急转，家电齐全，随时可看房。',
  price: 3500,
  detailInfo: '整租·两室一厅',
  tagText: '租房',
  tagTheme: 'primary',
  images: [],
  favorited: false
}
```

## 自定义配置

### 主题色

在 `index.wxss` 中修改主色调：

```css
/* 主色 - 橙色 */
#FF6B35

/* 辅助色 */
蓝色：#4A90E2
橙色：#F5A623
绿色：#7ED321
紫色：#BD10E0
```

### 导航项

在 `index.js` 中修改分类数据：

```javascript
categories: [
  { id: 'rental', name: '本地租房', icon: 'home', ... },
  { id: 'food', name: '周边美食', icon: 'fork', ... },
  ...
]
```

## 待完善功能

- [ ] 社区切换弹窗
- [ ] 搜索功能
- [ ] 帖子详情页
- [ ] 发布动态功能
- [ ] 私信聊天
- [ ] 用户个人中心
- [ ] 图片上传和预览
- [ ] 筛选和排序

## 注意事项

1. 需要先安装 `tdesign-miniprogram` 依赖
2. 必须在微信开发者工具中构建 npm 后才能使用 TDesign 组件
3. 项目使用了 Skyline 渲染引擎，需要小程序基础库 3.0.0 以上
4. 自定义导航栏需要在 app.json 中设置 `navigationStyle: "custom"`

## License

MIT
