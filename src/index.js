import {
  getRenderList,
  renderTemplate,
  isJsFile
} from './util/index'


const search = location.search
const queryList = /\?path=.+/.test(search) ? search.replace('?path=', '').split('/') : []
const filepath = queryList.length ? queryList.reduce((pre, cur) => {
  return `${pre}/${cur}`
}) : 'main'

if (!queryList.length) {
  console.log(`import ./${filepath}.js`);
  import(`./${filepath}.js`)
}

const filterReg = new RegExp(/^\.\/util/)
const jsList = require.context('./', true, /\.js/).keys().filter(v => !filterReg.test(v))
const jsLevelList = jsList.map(v => v.replace('./', '').split('/'))

if (isJsFile(queryList, jsLevelList)) {
  console.log(`import ./${filepath}.js`);
  import(`./${filepath}.js`)
}

renderTemplate(getRenderList(queryList, jsLevelList))
