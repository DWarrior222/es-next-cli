
export function getRenderList(queryList = [], jsLevelList = []) {
  const deep = queryList.length - 1
  const matchFloder = getMatchFloder(deep, queryList)(jsLevelList)
  const curFile = matchFloder.filter(v => /\.js/.test(v[deep + 1]))
  const curFloder = matchFloder.filter(v => !/\.js/.test(v[deep + 1]))
  const fileRenderList = getRenderPathList({ list: curFile, deep, type: 'file' })
  const floderRenderList = getRenderPathList({ list: curFloder, deep, type: 'floder' })
  const backRenderList = getBackUrl(curFileList(queryList, jsLevelList))
  return uniqueList([...backRenderList, ...fileRenderList, ...floderRenderList])
}

export function uniqueList(list = []) {
  const uniqueNameList = [...new Set(list.map(v => v.fileName))]
  const ret = uniqueNameList.map(name => {
    return list.find(v => v.fileName === name)
  })
  return ret
}

export function getMatchFloder(maxDeep, queryList) {
  return function match(list = [], deep = 0) {
    if (maxDeep < 0) return list.filter(v => v.length > 1)
    if (deep > maxDeep) return list
    const curName = queryList[deep]
    return match(list.filter(arr => arr[deep] === curName), deep + 1)
  }
}

export function renderTemplate(list) {
  const appEle = document.querySelector('#app');
  const listEle = document.createElement('ul');
  list.forEach(v => {
    const liEle = document.createElement('li')
    const link = document.createElement('a')
    link.href = v.path
    link.innerText = v.fileName
    liEle.appendChild(link)
    listEle.appendChild(liEle)
  })
  appEle.appendChild(listEle)
}

function getBackUrl(list) {
  if (!list) return []
  let backPath = 'http://localhost:8070/?path=' + list.join('/')
  return [{ fileName: '../', path: backPath, type: 'folder' }]
}

export function getRenderPathList({list = [], deep = 0, type = 'file'}) {
  return list.map(v => {
    const fileName = v[deep + 1]
    const path = 'http://localhost:8070/?path=' + v.slice(0, deep + 2).join('/').replace(/\.js$/, '')
    return { fileName, path, type }
  })
}

export function isJsFile(queryList = [], jsLevelList = []) {
  // 文件/目录 的层级
  const deep = queryList.length - 1
  // 获取该 文件/目录 同级的 文件/目录 列表
  const list = getMatchFloder(deep - 1, queryList)(jsLevelList)
  // 获取该 文件/目录 的名称
  const name = queryList.slice().pop()
  // 是否能从 文件/目录 列表中 匹配到该 文件/目录
  return list.some(v => v[deep] === (name + '.js'))
}

export function curFileList(queryList = [], jsLevelList = []) {
  // 文件/目录 的层级
  const deep = queryList.length - 1
  // 获取该 文件/目录 同级的 文件/目录 列表
  const list = getMatchFloder(deep - 1, queryList)(jsLevelList)
  // 获取该 文件/目录 的名称
  const name = queryList.slice().pop()
  // 从 文件/目录 列表中 匹配到该 文件/目录
  return deep < 0 ? undefined : list.find(v => v[deep] === name || v[deep] === (name + '.js')).slice(0, deep)
}