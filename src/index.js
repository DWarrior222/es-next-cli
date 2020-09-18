const hash = location.hash && location.hash.slice(1).split('/')
const filepath = hash ? hash.reduce((pre, cur) => {
  return `${pre}/${cur}`
}) : 'es-2021/index'
import(`./${filepath}.js`)

// console.log(require.context('./', true, /\.js/).keys())