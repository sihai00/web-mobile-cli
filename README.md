# web-mobile-cli
a tool to develop h5 project

## 目录
- dist: 打包后文件
- src
  - assets: 资源文件
  - html: （集合gulp-file-include）
    - common: 公共html
    - page.html
  - js
    - common：公共js
    - page：页面js
    - vender：第三方js库
  - sass
    - main.scss：公共scss文件
    - page：页面scss
- gulpfile: 配置文件

## 使用
``` bash
# 全局安装
npm install web-mobile-cli -g

# 创建项目目录(name为项目名字)
web-mobile-cli -n name

# 进入项目，运行前请先安装所需依赖
npm install

# 运行以下命令启动服务器 localhost:3000
npm start

# 打包（dist文件）
npm run build
```