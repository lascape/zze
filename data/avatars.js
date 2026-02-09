// 系统头像数据（预设头像列表）

const SYSTEM_AVATARS = [
  '/assets/avatars/avatar-1.png',
  '/assets/avatars/avatar-2.png',
  '/assets/avatars/avatar-3.png',
  '/assets/avatars/avatar-4.png',
  '/assets/avatars/avatar-5.png',
  '/assets/avatars/avatar-6.png',
  '/assets/avatars/avatar-7.png',
  '/assets/avatars/avatar-8.png'
]

// 获取随机系统头像
function getRandomAvatar() {
  const index = Math.floor(Math.random() * SYSTEM_AVATARS.length)
  return SYSTEM_AVATARS[index]
}

// 根据用户ID获取固定头像（确保同一用户总是同一头像）
function getAvatarByUserId(userId) {
  const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const index = hash % SYSTEM_AVATARS.length
  return SYSTEM_AVATARS[index]
}

module.exports = {
  SYSTEM_AVATARS,
  getRandomAvatar,
  getAvatarByUserId
}
