const fs = require('fs');
const path = require('path');

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

module.exports = {
  deleteall,
  move
}