const Helper = require('./helper'),
      path = require('path'),
      _ = require('underscore')
/**
 * 获取的目录中除去公共资源目录
 */

let filterFolder = (folders)=> {
  let ignores = ['assets', '.git']
  return _.filter(folders, (item)=> {
    return ignores.indexOf(item.name.toLowerCase()) < 0
  })
} 




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
  let menus = Helper.walkDirectory(path.dirname(__dirname) + '/markdown/' + end + '/' + project, 1).map((item)=> {
    let nm = path.basename(item)
    return {
      name: nm,
      href: '/' + end + '/' + project + '/' + nm
    }
  })
  return filterFolder(menus)
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

/** API菜单 */
let menu5 = (end, project)=> {
  return Helper.walkDirectory(path.dirname(__dirname) + '/markdown/' + end + '/' + project + '/API' , 1).map((item)=> {
    let nm = path.basename(item)
    return {
      name: nm,
      href: '/' + end + '/' + project + '/API/' + nm + '/'
    }
  })
}

/**
 * 帮助文档菜单
 */
let menu6 = ()=> {
  return Helper.walk(path.dirname(__dirname) + '/help', 1).map((item)=> {
    let nm = path.basename(item).split('.')[0]
    return {
      name: nm,
      href: '/help/' + nm 
    }
  })
}



module.exports = {
  menu1: menu1,
  menu2: menu2,
  menu3: menu3,
  menu4: menu4,
  menu5: menu5,
  menu6: menu6
}
