"use strict";
const exec = require('child_process').execSync,
      fs = require('fs'),
      projects = require('./project.config')


projects.forEach((pro)=> {

  let end = 'markdown/' + pro.name
  if(fs.accessSync(end, fs.R_OK)){
    exec('mkdir ' + end )
  }

  pro.projects.forEach((item)=> {
    let project = end + '/' + item.name
    if(fs.accessSync(project, fs.R_OK)){
      exec('git clone ' + item.git + ' ' + project)
      console.log('pull完毕：' + project)
    }else{
      exec('cd ' + project + ' && git pull')
      console.log('更新完毕：' + project)
    }
  })
})

exec('pm2 restart app.js ')
console.log('重启服务器成功')



