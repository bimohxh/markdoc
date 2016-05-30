const Helper = require('./helper'),
      path = require('path')


// 所有的端
let menu1 = Helper.walkDirectory(path.dirname(__dirname) + '/markdown', 1).map((item)=> {
  let nm = path.basename(item)
  return {
    name: nm,
    href: '/' + nm
  }
})


// 指定端下面的所有项目
let menu2 = (end)=> {
  return Helper.walkDirectory(path.dirname(__dirname) + '/markdown/' + end, 1).map((item)=> {
    let nm = path.basename(item)
    return {
      name: nm,
      href: '/' + end + '/' + nm
    }
  })
}


let menu3 = (end, project)=> {
  return Helper.walkDirectory(path.dirname(__dirname) + '/markdown/' + end + '/' + project, 1).map((item)=> {
    let nm = path.basename(item)
    return {
      name: nm,
      href: '/' + end + '/' + project + '/' + nm
    }
  })
}

let menu4 = (end, project, doc)=> {
  return Helper.walk(path.dirname(__dirname) + '/markdown/' + end + '/' + project + '/' + doc, 1).map((item)=> {
    let nm = path.basename(item).split('.')[0]
    return {
      name: nm,
      href: '/' + end + '/' + project + '/' + doc + '/' + nm
    }
  })
}
 



module.exports = {
  menu1: menu1,
  menu2: menu2,
  menu3: menu3,
  menu4: menu4
}
