#!/usr/bin/env node

const { program } = require('commander');
const childProcess = require('child_process');
const package = require('../package.json');
const version = package.version;
const { deleteall, move } = require('../utils/util');

program.version(version, '-v, --version');
	
program.command('init [pathname]').action((pathname) => {
	console.log('clone template ...');
	childProcess.exec('git clone https://github.com/DWarrior222/es-next-cli.git', err => {
		if (err !== null) {
			console.log('exec err: ' + err);
			return;
		}
		const curPath = process.cwd() + '/es-next-cli/';
		deleteall(curPath + '.git');
		if (pathname) move(curPath, pathname);
		console.log('clone success');
	});
});

program.parse(process.argv);