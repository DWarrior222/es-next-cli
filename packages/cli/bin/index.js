#!/usr/bin/env node

const { program } = require('commander');
const childProcess = require('child_process');
const fs = require('fs');
const package = require('../package.json');
const version = package.version;

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

program.version(version, '-v, --version')
  .command('init')
  .action(() => {
    console.log('clone template ...');
    childProcess.exec('git clone https://github.com/DWarrior222/es-next-cli.git', err => {
      if (err !== null) {
        console.log('exec err: ' + err);
        return;
      }
      deleteall(process.cwd() + '/es-next-cli/.git');
      console.log('clone success');
    });
  });

program.parse(process.argv);