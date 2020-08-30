import 'core-js/proposals/string-replace-all';
import 'core-js/proposals/promise-any'
// import 'core-js/features/promise/any'
// import 'core-js/modules/esnext.promise.any'

// String.prototype.replaceAll proposal
const str = 'q=query+string+parameters';
const res = str.replace(/\+/g, ' ');

const queryString = 'q=query+string+parameters';
const withSpaces = queryString.replaceAll('+', ' ');
console.log(res, withSpaces);

console.log('xxx'.replaceAll('', '_'));


// Promise.any
const p1 = new Promise((resolve, reject) => {
  setTimeout(reject, 1000, 11)
})
const p2 = new Promise((resolve) => {
  setTimeout(resolve, 2000, 22)
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(reject, 500, 33)
})
Promise.any([
  p1, p2, p3
]).then((first) => {
  // Any of the promises was fulfilled.
  console.log(first);
  // → 'home'
}).catch((error) => {
  // All of the promises were rejected.
  console.log(error);
});

// Promise.any([
//   Promise.resolve(1),
//   Promise.reject(2),
//   Promise.resolve(3),
// ]).then(console.log); // => 1