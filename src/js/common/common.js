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
  // 请求
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

document.addEventListener('DOMContentLoaded', function() {
  console.log('ready')
})
