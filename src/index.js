const hash = location.hash.slice(1).split('/')
const filepath = hash.reduce((pre, cur) => {
  return `${pre}/${cur}`
})
import(`./${filepath}.js`)