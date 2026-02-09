// Mock 帖子数据

const { COMMUNITIES } = require('./communities.js')

// 分类定义
const CATEGORIES = {
  RENT: { id: 'rent', name: '租房', icon: 'home' },
  FOOD: { id: 'food', name: '美食', icon: 'fork' },
  SECONDHAND: { id: 'secondhand', name: '二手', icon: 'shop' },
  SERVICE: { id: 'service', name: '服务', icon: 'service' }
}

// 状态定义
const POST_STATUS = {
  PENDING: 'pending',      // 审核中
  APPROVED: 'approved',    // 已通过
  REJECTED: 'rejected'     // 已驳回
}

// Mock 帖子数据
const MOCK_POSTS = [
  // 租房类
  {
    id: 'p1',
    category: 'rent',
    title: '阳光花园两室一厅出租',
    description: '精装修，拎包入住，家电齐全，采光好，交通便利',
    images: ['/assets/images/rent-1.jpg'],
    communityId: 'c1',
    district: 'A区',
    authorId: 'u1',
    authorName: '李先生',
    createdAt: Date.now() - 3600000 * 2,
    status: 'approved',
    params: {
      rent: '2500元/月',
      roomType: '2室1厅',
      area: '85㎡',
      floor: '6/18层'
    }
  },
  {
    id: 'p2',
    category: 'rent',
    title: '绿城小区单间出租',
    description: '临近地铁站，独立卫浴，安静舒适',
    images: [],
    communityId: 'c2',
    district: '东区',
    authorId: 'u2',
    authorName: '王女士',
    createdAt: Date.now() - 86400000,
    status: 'approved',
    params: {
      rent: '1200元/月',
      roomType: '1室',
      area: '25㎡',
      floor: '3/7层'
    }
  },
  // 美食类
  {
    id: 'p3',
    category: 'food',
    title: '小区门口新开川菜馆',
    description: '味道正宗，价格实惠，环境干净，推荐水煮鱼和麻婆豆腐',
    images: ['/assets/images/food-1.jpg'],
    communityId: 'c1',
    district: 'B区',
    authorId: 'u3',
    authorName: '张同学',
    createdAt: Date.now() - 3600000 * 5,
    status: 'approved',
    params: {
      avgPrice: '人均50元',
      cuisine: '川菜',
      rating: '4.5分'
    }
  },
  {
    id: 'p4',
    category: 'food',
    title: '星海湾附近甜品店',
    description: '环境优雅，甜品精致，适合下午茶',
    images: [],
    communityId: 'c3',
    district: '1号楼',
    authorId: 'u4',
    authorName: '陈小姐',
    createdAt: Date.now() - 86400000 * 2,
    status: 'approved',
    params: {
      avgPrice: '人均35元',
      cuisine: '甜品',
      rating: '4.8分'
    }
  },
  // 二手类
  {
    id: 'p5',
    category: 'secondhand',
    title: '9成新冰箱转让',
    description: '搬家转让，品牌美的，容量大，制冷效果好',
    images: ['/assets/images/secondhand-1.jpg'],
    communityId: 'c2',
    district: '西区',
    authorId: 'u5',
    authorName: '刘先生',
    createdAt: Date.now() - 3600000 * 10,
    status: 'approved',
    params: {
      price: '800元',
      condition: '9成新',
      brand: '美的'
    }
  },
  {
    id: 'p6',
    category: 'secondhand',
    title: '儿童自行车转让',
    description: '孩子长大了用不上了，8成新，质量很好',
    images: [],
    communityId: 'c4',
    district: '梅园',
    authorId: 'u6',
    authorName: '赵女士',
    createdAt: Date.now() - 86400000 * 3,
    status: 'approved',
    params: {
      price: '150元',
      condition: '8成新',
      brand: '好孩子'
    }
  },
  // 服务类
  {
    id: 'p7',
    category: 'service',
    title: '专业家电维修',
    description: '维修经验丰富，价格公道，上门服务',
    images: [],
    communityId: 'c1',
    district: 'C区',
    authorId: 'u7',
    authorName: '孙师傅',
    createdAt: Date.now() - 3600000 * 15,
    status: 'approved',
    params: {
      serviceType: '家电维修',
      experience: '10年经验'
    }
  },
  {
    id: 'p8',
    category: 'service',
    title: '钟点工服务',
    description: '专业保洁，细心负责，可长期合作',
    images: [],
    communityId: 'c5',
    district: 'A座',
    authorId: 'u8',
    authorName: '周阿姨',
    createdAt: Date.now() - 86400000 * 4,
    status: 'approved',
    params: {
      serviceType: '家政保洁',
      experience: '5年经验'
    }
  }
]

/**
 * 获取帖子列表
 * @param {Object} options - 筛选选项
 * @returns {Array} 帖子列表
 */
function getPosts(options = {}) {
  const { communityId, category, range, status } = options
  
  let posts = [...MOCK_POSTS]
  
  // 按社区过滤
  if (communityId && range !== 'nearby') {
    posts = posts.filter(post => post.communityId === communityId)
  }
  
  // 按分类过滤
  if (category) {
    posts = posts.filter(post => post.category === category)
  }
  
  // 按状态过滤
  if (status) {
    posts = posts.filter(post => post.status === status)
  } else {
    // 默认只显示已通过的
    posts = posts.filter(post => post.status === 'approved')
  }
  
  // 按时间排序
  posts.sort((a, b) => b.createdAt - a.createdAt)
  
  return posts
}

/**
 * 根据ID获取帖子
 * @param {string} id - 帖子ID
 * @returns {Object|null} 帖子对象
 */
function getPostById(id) {
  return MOCK_POSTS.find(post => post.id === id) || null
}

module.exports = {
  CATEGORIES,
  POST_STATUS,
  MOCK_POSTS,
  getPosts,
  getPostById
}
