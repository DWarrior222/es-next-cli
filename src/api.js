
console.log(Proxy);

Promise.resolve(1)

console.log(globalThis.setTimeout, 'globalThis.setTimeout');

console.log([1,2,3].includes)

// async 是一个特殊的语法，看起来像是一个语法，但本质上是 generator 的语法糖，可以说就是一个 api，所以 babel 写了一个 regenerator 的 runtime
async function func () {
  await 1
  console.log(2);
}
func()

