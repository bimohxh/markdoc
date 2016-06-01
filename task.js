"use strict";
const exec = require('child_process').execSync,
      fs = require('fs'),
      projects = require('./project.config.json')


let now = 1;
let total = projects.reduce((result, item)=> {
  return result + item.projects.length
}, 0);


let makeDoc = ()=> { 
  console.log('编译时间：' + new Date())
  console.log('有' + total + '个项目需要更新')
  return new Promise((resolve)=> {
    projects.forEach((pro)=> {
      let end = 'markdown/' + pro.name
      fs.access(end, fs.R_OK,(err)=> {
        if(err){
          exec('mkdir ' + end )
        }

        pro.projects.forEach((item)=> {
          let project = end + '/' + item.name 
          fs.access(project, fs.R_OK, (err2)=> {
            if(err2){
              exec('git clone ' + item.git + ' ' + project)
              console.log('[' + now + '] clone完毕：' + project)
            }else{
              exec('cd ' + project + ' && git pull')
              console.log('[' + now + '] 更新完毕：' + project)
            }
            now ++
            if(now == total){
              resolve()
            }
          })
        })
      })
    })
  })
}

makeDoc().then(()=> {
  exec('pm2 restart app.js ')
  console.log('重启服务器成功')
})







