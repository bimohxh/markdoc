# 关于vue

我们选择了 `vuejs` （[官网](http://cn.vuejs.org)）作为前端 MVVM 框架，那么实际开发中该怎么使用呢？

# 绑定数据

常见的情况是，我们需要将 API 请求回来的数据渲染到视图中，这个时候我们就需要将接收到的数据加入到 vue 实例的 `data` 对象中去。

由于在 `Basic` 类中进行了封装，我们只需要在子类中注册该数据即可：

```javascript
API.list('getPostsList', {},  (data)=> {
  this.mvvm.$set('posts', data.items)
})
```
接下来就可以在视图中进行展示了：

```jade
table
  ....
  tr(v-for="item in posts")
    td {{item.title}}
```

# 注册方法

比如我们登陆页面需要有一个登陆按钮，需要绑定登陆的事件处理。那么首先我们需要给元素绑定事件处理器：

```jade
button(v-on:click="login()")
```
然后将 `login()` 方法注册到 vue 实例上，在 `login.js` 文件中：

```javascript
class Login extends Basic {
  constructor(){
    super()
    model = this
    this.init()
  }
  init(){
    this.register(['login'])
  }
  login(){
    //....
  }
```
这里关键是 `register()` 这个方法，这是我们在 `basic` 类中定义的，用于将该类的实例方法注册到 vue 实例上。 
