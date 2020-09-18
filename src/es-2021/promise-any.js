import 'core-js/proposals/promise-any'

const p1 = new Promise((resolve, reject) => {
  setTimeout(reject, 1000, 11)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(reject, 2000, 22)
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(reject, 500, 33)
})
let p = Promise.any([
  p1, p2, p3
]).then((first) => {
  // Any of the promises was fulfilled.
  console.log('resolve: ', first, 'promise status: ', p);
  // → 'home'
}).catch((error) => {
  // All of the promises were rejected.
  console.log('error: ', error, 'promise status: ', p);
});


Promise.any([
  Promise.resolve(111),
  Promise.reject(2),
  Promise.resolve(3),
]).then(console.log); // => 1