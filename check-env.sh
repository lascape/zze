#!/bin/bash

# 环境检查脚本
# 用于检查项目运行所需的环境是否就绪

echo "🔍 正在检查项目运行环境..."
echo ""

# 检查 Node.js
echo "1️⃣ 检查 Node.js..."
if command -v node &> /dev/null
then
    NODE_VERSION=$(node -v)
    echo "   ✅ Node.js 已安装: $NODE_VERSION"
else
    echo "   ❌ Node.js 未安装"
    echo "   请访问 https://nodejs.org/ 下载安装"
    exit 1
fi

# 检查 npm
echo ""
echo "2️⃣ 检查 npm..."
if command -v npm &> /dev/null
then
    NPM_VERSION=$(npm -v)
    echo "   ✅ npm 已安装: v$NPM_VERSION"
else
    echo "   ❌ npm 未安装"
    exit 1
fi

# 检查 node_modules
echo ""
echo "3️⃣ 检查依赖安装..."
if [ -d "node_modules" ]; then
    echo "   ✅ node_modules 目录存在"
    
    # 检查 TDesign
    if [ -d "node_modules/tdesign-miniprogram" ]; then
        echo "   ✅ TDesign 组件库已安装"
    else
        echo "   ❌ TDesign 组件库未安装"
        echo "   请运行: npm install"
        exit 1
    fi
else
    echo "   ❌ node_modules 目录不存在"
    echo "   请运行: npm install"
    exit 1
fi

# 检查项目配置文件
echo ""
echo "4️⃣ 检查项目配置..."
if [ -f "app.json" ]; then
    echo "   ✅ app.json 存在"
else
    echo "   ❌ app.json 不存在"
    exit 1
fi

if [ -f "project.config.json" ]; then
    echo "   ✅ project.config.json 存在"
else
    echo "   ❌ project.config.json 不存在"
    exit 1
fi

# 检查必要的页面
echo ""
echo "5️⃣ 检查页面文件..."
PAGES=("community" "discovery" "publish" "messages" "me")
ALL_PAGES_EXIST=true

for page in "${PAGES[@]}"
do
    if [ -d "pages/$page" ]; then
        echo "   ✅ pages/$page 存在"
    else
        echo "   ❌ pages/$page 不存在"
        ALL_PAGES_EXIST=false
    fi
done

if [ "$ALL_PAGES_EXIST" = false ]; then
    exit 1
fi

# 总结
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 环境检查完成！"
echo ""
echo "📱 下一步："
echo "   1. 打开微信开发者工具"
echo "   2. 导入项目（选择当前目录）"
echo "   3. 点击 工具 → 构建 npm"
echo "   4. 点击 编译 按钮"
echo ""
echo "📚 详细说明请查看: QUICKSTART.md"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
