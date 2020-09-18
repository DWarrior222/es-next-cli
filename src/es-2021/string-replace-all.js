import 'core-js/proposals/string-replace-all';

const str = 'q=query+string+parameters';
const res = str.replace(/\+/g, ' ');

const str1 = 'q=query+string+parameters';
const res1 = str1.replaceAll('+', ' ');
console.log(res === res1);
console.log('xxx'.replaceAll('', '_'));
