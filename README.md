# web-mobile-cli
可快速开发移动端h5的脚手架，采用scss搭配vw可适配不同手机尺寸且使用原生es7语法（可使用async..await等）和zepto，使原生开发的项目最小化。

## 目录
- dist: 打包后文件（默认打包后为***dist***目录，默认浏览器打开首页为***dist/index.html***）
- src
  - assets: 资源文件
  - html: （集成gulp-file-include）
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

> **注意**
运行npm start后如果白屏或者出错，请手动刷新一次，导致的原因可能是browser-sync启动浏览器的时候还没有打包完成

## html
集合了[gulp-file-include]('https://github.com/coderhaoxin/gulp-file-include')，可抽离出一部分公共静态的html片段，重复使用。
```html
<!-- a.html -->
<div>a.html</div>
```

```html
<!-- b.html -->
<div>b.html</div>
@@include('./view.html')
```

```html
<!-- 最终渲染 -->
<div>a.html</div>
<div>b.html</div>
```

## sass
默认设计图为750，通过[vw方案]('https://www.w3cplus.com/css/vw-for-layout.html')自动适配

```scss
$baseFontSize: 7.5;
@function pxToVw($px) {
  @return $px / $baseFontSize * 1vw;
}
```

## 生命周期
- constructor
  - this.state：储存当前页面的变量
  - this.init：初始化
- init：
  - load：用于数据请求、数据渲染
  - ready：用于事件的绑定（只有当load执行完才可调用）

```javascript
class index extends parent{
  constructor(){
    super()
    
    this.state = {
      $list: $('#js-page'),
      arr: []
    }

    // 初始化
    this.init()
  }
  async init(){
    // 加载前 - 用于请求数据
    await this.load()

    // 加载后 - 用于绑定事件
    this.ready()
  }
  async load(){
    const data = await this.fetchData()

    this.state.arr = data.data
    // 拿到数据后渲染render()
  }
  ready(){
    // 在此初次渲染后可绑定事件
  }
  fetchData(){
    // parent类中的fetch方法
    return this.fetch({
      method: 'get',
      url: `${this.baseUriApi}/topics`,
      params: {
        limit: 10
      }
    })
  }
}
```

## javascript
可以使用es7语法，打包后经过babel转译为es5

### parent类
page中的js都继承自parent，parent可以存放一些全局的方法和变量给子类调用

```javascript
class parent {
  constructor(){
    this.baseUri = 'https://cnodejs.org'
    this.baseUriApi = this.baseUri + '/api/v1'
    this.windowUrl = window.location.href
    this.origin = window.location.origin
    this.params = this.getUrlParams()
  }
  // 获取url参数
  getUrlParams(url){
    var uri = url || this.windowUrl
    var match = uri && uri.match(/([^?=&]+)=([^?&]+)/g)

    return match && match.reduce(function(a, b){
      var val = b.split(/([^?=&]+)=([^?&]+)/g)
      a[val[1]] = val[2]
      return a
    }, {})
  }
  // 请求数据
  fetch(option){
    return new Promise((resolve, reject) => {
      $.ajax({
        type: option.method,
        url: option.url,
        data: option.method === 'get' ? option.params : JSON.stringify(option.params),
        contentType: 'application/json',
        success: function(data){
          resolve(data)
        },
        error: function(xhr, type) {
          reject(JSON.parse(xhr.response)['error']['message'])
        }
      })
    }).catch(err => alert(`错误信息: ${err}`))
  }
}
```

#### getUrlParams：可获取地址栏的参数
```javascript
this.getUrlParams('http://localhost:3000?a=1&b=2')

// 转化为
{
  a: 1,
  b: 2
}
```

#### fetch：请求数据
请求错误做统一处理，调用this.fetch()后返回请求的数据
- method：请求方法
- url：请求地址
- params: 请求参数

```javascript
const data = this.fetch({
  method: 'get',
  url: `${this.baseUriApi}/topics`,
  params: {
    limit: 10
  }
})
```
