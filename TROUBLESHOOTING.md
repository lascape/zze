# 常见问题修复记录

## 1. TDesign 组件路径错误

### 问题描述
```
app.json: ["usingComponents"]["t-toast"]: "tdesign-miniprogram/toast/toast"
未找到组件
```

### 错误原因

在 app.json 中全局注册了 `t-toast` 和 `t-message` 组件，但：

1. **路径不正确**：TDesign 组件实际路径是 `tdesign-miniprogram/miniprogram_dist/toast/toast`
2. **不需要全局注册**：Toast 和 Message 组件通常通过 API 调用，不需要全局注册
3. **影响性能**：全局注册会让所有页面都加载这些组件

### 解决方案

**已修复：** 从 app.json 的 `usingComponents` 中移除了这两个组件。

修改前：
```json
{
  "usingComponents": {
    "t-toast": "tdesign-miniprogram/toast/toast",
    "t-message": "tdesign-miniprogram/message/message"
  }
}
```

修改后：
```json
{
  // 移除了 usingComponents 配置
  "style": "v2",
  "sitemapLocation": "sitemap.json"
}
```

### 验证修复

1. 重新在微信开发者工具中编译项目
2. 应该不再出现组件路径错误
3. 所有页面的 TDesign 组件使用正常

### Toast 和 Message 的正确使用方式

在 TDesign 中，Toast 和 Message 通常通过 API 调用，而不是作为组件使用：

#### 使用 wx.showToast（原生方式）
```javascript
wx.showToast({
  title: '操作成功',
  icon: 'success',
  duration: 2000
})
```

#### 使用 TDesign Toast API（如果需要）
在页面的 json 文件中按需引入：
```json
{
  "usingComponents": {
    "t-toast": "tdesign-miniprogram/toast/toast"
  }
}
```

在 wxml 中：
```xml
<t-toast id="t-toast" />
```

在 js 中：
```javascript
import Toast from 'tdesign-miniprogram/toast/index';

Toast({
  message: '操作成功',
  duration: 2000
});
```

### 其他常见组件路径问题

如果遇到其他 TDesign 组件找不到的问题：

1. **检查是否构建了 npm**
   ```
   微信开发者工具 → 工具 → 构建 npm
   ```

2. **确认组件路径格式**
   ```json
   "t-button": "tdesign-miniprogram/button/button"
   ```

3. **检查 miniprogram_npm 目录**
   构建 npm 后应该生成 `miniprogram_npm/tdesign-miniprogram/` 目录

4. **在页面级别引入组件**（推荐）
   在各个页面的 json 文件中按需引入，而不是全局注册

### 相关文档

- [TDesign 小程序文档](https://tdesign.tencent.com/miniprogram/overview)
- [微信小程序组件引用](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)

---

**修复日期**: 2026-02-09
**状态**: ✅ 已解决
