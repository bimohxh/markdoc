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
      menu = require('./lib/menu'),
      exec = require('child_process').execSync,
      bodyParser = require('koa-bodyparser');



app.use(bodyParser());

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

router.get('/log', async (ctx, next) =>{
  let log = fs.readFileSync('./log/build.log', {encoding : 'utf8'}) 
  await renderAction(ctx, 'home', 'log', {log: log})
});

// -配置
router.get('/config', async (ctx, next) =>{
  await renderAction(ctx, 'home', 'config')
});

router.post('/config', async (ctx, next) =>{
  ctx.body = require('./project.config.json')
});

router.post('/config/update', async (ctx, next) =>{
  let config = require('./project.config.json')
  let req = ctx.request.body

  let end = _.find(config, (item)=> {
    return item.id == req.id
  })
  // 更新/添加终端
  if(req.model == 'end'){
    if (end) {
      try{
        fs.renameSync(__dirname + '/markdown/' + end.name, __dirname + '/markdown/' + req.name)
      } catch(err) {}
      end.name = req.name
    }
    else{
      let id = config[config.length - 1].id + 1
      config.push({
        name: req.name,
        id: id,
        projects: []
      })
    }
  }

  // 更新/添加项目
  if(req.model == 'project'){
    let project = _.find(end.projects, (item)=> {
      return item.id == req.pid
    })
    if(project) {
      if(project.name != req.name){
        try{
          fs.renameSync(__dirname + '/markdown/' + end.name + '/' + project.name, __dirname + '/markdown/' + end.name + '/' + req.name)
        } catch(err) {}
      }
      if(project.git != req.git){
        try{
          fs.renameSync(__dirname + '/markdown/' + end.name + '/' + req.name, __dirname + '/markdown/' + end.name + '/_removed_' + req.name)
        } catch(err) {}
      }
      project.name = req.name
      project.git = req.git
      project.repo = req.repo
    }else{
      let last = end.projects[end.projects.length - 1]
      let id = last ? last.id + 1 : 1
      end.projects.push({
        id: id,
        name: req.name,
        git: req.git,
        repo: req.repo
      })
    }
    
  }

  fs.writeFileSync('./project.config.json', JSON.stringify(config)); 
  ctx.body = {status: 'ok'}
});

router.post('/config/destroy', async (ctx, next) =>{
  let config = require('./project.config.json')
  let req = ctx.request.body

  let end = _.find(config, (item)=> {
    return item.id == req.id
  })
  // 删除终端
  if(req.model == 'end'){
    config = _.without(config, end)
  }

  // 删除项目
  if(req.model == 'project'){
    let project = _.find(end.projects, (item)=> {
      return item.id == req.pid
    })

    end.projects = _.without(end.projects, project)
  }

  fs.writeFileSync('./project.config.json', JSON.stringify(config)); 
  ctx.body = {status: 'ok'}
});


//- 帮助
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
