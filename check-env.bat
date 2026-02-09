@echo off
chcp 65001 >nul
echo 🔍 正在检查项目运行环境...
echo.

REM 检查 Node.js
echo 1️⃣ 检查 Node.js...
where node >nul 2>nul
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
    echo    ✅ Node.js 已安装: !NODE_VERSION!
) else (
    echo    ❌ Node.js 未安装
    echo    请访问 https://nodejs.org/ 下载安装
    exit /b 1
)

echo.
echo 2️⃣ 检查 npm...
where npm >nul 2>nul
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
    echo    ✅ npm 已安装: v!NPM_VERSION!
) else (
    echo    ❌ npm 未安装
    exit /b 1
)

echo.
echo 3️⃣ 检查依赖安装...
if exist "node_modules" (
    echo    ✅ node_modules 目录存在
    
    if exist "node_modules\tdesign-miniprogram" (
        echo    ✅ TDesign 组件库已安装
    ) else (
        echo    ❌ TDesign 组件库未安装
        echo    请运行: npm install
        exit /b 1
    )
) else (
    echo    ❌ node_modules 目录不存在
    echo    请运行: npm install
    exit /b 1
)

echo.
echo 4️⃣ 检查项目配置...
if exist "app.json" (
    echo    ✅ app.json 存在
) else (
    echo    ❌ app.json 不存在
    exit /b 1
)

if exist "project.config.json" (
    echo    ✅ project.config.json 存在
) else (
    echo    ❌ project.config.json 不存在
    exit /b 1
)

echo.
echo 5️⃣ 检查页面文件...
set ALL_PAGES_EXIST=1

if exist "pages\community" (
    echo    ✅ pages\community 存在
) else (
    echo    ❌ pages\community 不存在
    set ALL_PAGES_EXIST=0
)

if exist "pages\discovery" (
    echo    ✅ pages\discovery 存在
) else (
    echo    ❌ pages\discovery 不存在
    set ALL_PAGES_EXIST=0
)

if exist "pages\publish" (
    echo    ✅ pages\publish 存在
) else (
    echo    ❌ pages\publish 不存在
    set ALL_PAGES_EXIST=0
)

if exist "pages\messages" (
    echo    ✅ pages\messages 存在
) else (
    echo    ❌ pages\messages 不存在
    set ALL_PAGES_EXIST=0
)

if exist "pages\me" (
    echo    ✅ pages\me 存在
) else (
    echo    ❌ pages\me 不存在
    set ALL_PAGES_EXIST=0
)

if %ALL_PAGES_EXIST% equ 0 (
    exit /b 1
)

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🎉 环境检查完成！
echo.
echo 📱 下一步：
echo    1. 打开微信开发者工具
echo    2. 导入项目（选择当前目录）
echo    3. 点击 工具 → 构建 npm
echo    4. 点击 编译 按钮
echo.
echo 📚 详细说明请查看: QUICKSTART.md
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
