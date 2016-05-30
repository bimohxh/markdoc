'use strict'; 
const _ = require('underscore')
require("babel-polyfill");

const Koa = require('koa'),
      app = new Koa(),
      views = require('koa-views'),
      router = require('koa-router')(),
      serve = require('koa-static'),
      mount = require('koa-mount'),
      url = require('url'),
      qs = require('querystring'),
      fs = require("fs"),
      marked = require('marked'),
      menu = require('./lib/menu');




// 静态文件服务
app.use(mount('/assets', serve(__dirname + '/assets')));
app.use(mount('/', serve(__dirname + '/markdown')));
app.use(mount('/', serve(__dirname + '/help')));

//视图处理
app.use(views(__dirname + '/views', {
  map: {
    jade: 'jade'
  }
}));

// 路由
let renderAction = async (ctx, controller, action, extra)=> {
  let vi = controller + '/' + action + '.jade'
  await ctx.render(vi,
    _.extend({
      params: ctx.params,
      route: {
        controller: controller,
        action: action
      },
      menu: menu,
      query: qs.parse(url.parse(ctx.request.url).query)
  }, extra))
}

router.get('/help', async (ctx, next) =>{
  ctx.redirect(encodeURI('http://' + ctx.host + menu.menu6()[0].href))
});

router.get('/help/:md', async (ctx, next) =>{
  let con = fs.readFileSync(__dirname + '/help/' + ctx.params.md + '.md')
  await renderAction(ctx, 'home', 'help', {con: con})
});


router.get('/:end/:project/:doc/:md', async (ctx, next) =>{
  let docs = menu.menu4(ctx.params.end, ctx.params.project, ctx.params.doc)
  let doc = _.find(docs, (item)=> {
    return item.name == ctx.params.md
  })
  let name = doc.file || doc.name
  let con = fs.readFileSync(__dirname + '/markdown/' + ctx.params.end + '/' + ctx.params.project + '/' + ctx.params.doc + '/' + name + '.md')
  await renderAction(ctx, 'home', 'doc', {con: con})
});



router.get('/', async (ctx, next) =>{
  await renderAction(ctx, 'home', 'index')
});




router.get('/:end', async (ctx, next) =>{
  await renderAction(ctx, 'home', 'end')
});


router.get('/:end/:project', async (ctx, next) =>{
  let project = menu.menu3(ctx.params.end, ctx.params.project)[0]
  if (project) {
    ctx.redirect(encodeURI('http://' + ctx.host + project.href))
  }else{
    await renderAction(ctx, 'home', 'doc')
  }
});


router.get('/:end/:project/:doc', async (ctx, next) =>{
  let doc = menu.menu4(ctx.params.end, ctx.params.project, ctx.params.doc)[0]
  if (doc) {
    ctx.redirect(encodeURI('http://' + ctx.host + doc.href))
  }else{
    if (ctx.params.doc.toLowerCase() == 'api') {
      await renderAction(ctx, 'home', 'api')
    }else{
      await renderAction(ctx, 'home', 'doc')
    }
    
  }
  
});


app
  .use(router.routes())
  .use(router.allowedMethods());



app.listen(4000);
