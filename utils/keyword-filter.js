// 关键词过滤工具 - 防止中介和敏感信息

// 敏感关键词列表
const SENSITIVE_KEYWORDS = [
  'vx', 'VX', 'Vx',
  '微信', 'weixin', 'WeChat', 'wechat',
  '电话', '手机号', '联系方式',
  'http', 'https', 'www',
  '二维码', 'QR',
  '加微', '加我',
  '同号',
  'qq', 'QQ',
  '中介'
]

// 敏感昵称关键词
const NICKNAME_KEYWORDS = [
  '中介',
  'vx',
  '微信',
  '电话',
  '加我',
  'qq'
]

/**
 * 检查文本是否包含敏感关键词
 * @param {string} text - 要检查的文本
 * @returns {Object} { valid: boolean, keyword: string|null }
 */
function checkSensitiveWords(text) {
  if (!text) {
    return { valid: true, keyword: null }
  }

  const lowerText = text.toLowerCase()
  
  for (const keyword of SENSITIVE_KEYWORDS) {
    if (lowerText.includes(keyword.toLowerCase())) {
      return {
        valid: false,
        keyword: keyword
      }
    }
  }

  return { valid: true, keyword: null }
}

/**
 * 检查昵称是否包含敏感关键词
 * @param {string} nickname - 昵称
 * @returns {Object} { valid: boolean, keyword: string|null }
 */
function checkNickname(nickname) {
  if (!nickname) {
    return { valid: false, keyword: null }
  }

  const lowerText = nickname.toLowerCase()
  
  for (const keyword of NICKNAME_KEYWORDS) {
    if (lowerText.includes(keyword.toLowerCase())) {
      return {
        valid: false,
        keyword: keyword
      }
    }
  }

  return { valid: true, keyword: null }
}

/**
 * 显示敏感词提示
 * @param {string} keyword - 触发的关键词
 */
function showSensitiveWordTip(keyword) {
  wx.showToast({
    title: `不允许包含敏感词：${keyword}`,
    icon: 'none',
    duration: 2000
  })
}

module.exports = {
  checkSensitiveWords,
  checkNickname,
  showSensitiveWordTip,
  SENSITIVE_KEYWORDS,
  NICKNAME_KEYWORDS
}
