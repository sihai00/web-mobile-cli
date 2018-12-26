document.addEventListener('DOMContentLoaded', function(){
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
    init(){
      // 加载前 - 用于请求数据
      this.load()

      // 加载后 - 用于绑定事件
      // this.ready()
    }
    load(){
      this.fetchData().then(data => {
        this.state.arr = data.data
        this.render(this.state.arr)

        this.ready()
      })
    }
    ready(){

    }
    fetchData(){
      return this.fetch({
        method: 'get',
        url: `${this.baseUriApi}/topics`,
        params: {
          limit: 10
        }
      })
    }
    createListFragment(arr){
      let fragment = document.createDocumentFragment()
      arr.forEach((v) => {
        let html = `
          <div>${v.title}</div>
        `
        fragment.appendChild($(html)[0])
      })

      return fragment
    }
    render(arr){
      let fragment = this.createListFragment(arr)
      this.state.$list.append(fragment)
    }
  }

  new index()
})
