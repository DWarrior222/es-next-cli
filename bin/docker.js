
const path = require('path');
const { downloadFile } = require('../utils/util');
console.log('init docker ...');
const list = [
  {
    sourceFile: 'https://raw.githubusercontent.com/DWarrior222/node-static-server/master/README.md',
    newFile: 'README.md'
  }
];
list.forEach(({ sourceFile, newFile }) => {
  const curPath = path.resolve(process.cwd(), newFile);
  downloadFile(sourceFile, curPath)
})
console.log('init success');