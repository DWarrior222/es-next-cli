const fs = require('fs');
const path = require('path');

function deleteDir (path) {
  if (!fs.statSync(path)) return
  fs.rmdirSync(path, { recursive: true }) // recursive 为 true 表示递归删除
}

function deleteall (path) {
	let files = [];
	if (fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(file => {
			let curPath = path + "/" + file;
			if(fs.statSync(curPath).isDirectory()) { // recurse
				deleteall(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
}

function move (curPath, pathname) {
	const toPath = path.resolve(pathname);
	if (fs.existsSync(curPath)) {
		fs.renameSync(curPath, toPath, err => {
			if (err) {
				console.log(err);
				return
			}
		})
	}
}


function moveCur (curPath) {
	const dirList = fs.readdirSync(curPath)
	dirList.forEach(path => {
		fs.renameSync(curPath + path, `${process.cwd()}/${path}`)
	})
}

module.exports = {
  deleteall,
	move,
	moveCur,
	deleteDir
}