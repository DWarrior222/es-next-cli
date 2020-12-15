// 空值合并操作符

function example(opts) {
  // Setters are not needlessly called.
  // opts.foo ??= 'bar'
  opts.foo = opts.foo ?? 'bar'

  // No repetition of `opts.baz`.
  // opts.baz ??= 'qux';
  opts.baz = opts.baz ?? 'qux'

  console.log('opts: ', opts);
}

example({ foo: 'foo' })