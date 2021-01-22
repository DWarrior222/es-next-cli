#!/usr/bin/env node

const { program } = require('commander');
const childProcess = require('child_process');
const package = require('../package.json');
const version = package.version;
const { deleteDir } = require('../utils/util');
const { questAnswer } = require('../utils/interactive');
const path = require('path');

program.version(version, '-v, --version');

program.command('install [pathname]').action(async (pathname) => {
	if (pathname !== 'docker') {
		console.log('没有这个命令');
		return;
	}
	require(`./${pathname}.js`)
});

program.command('init [pathname]').action(async (pathname) => {
	const isSaveExample = await questAnswer({ question: '是否保留示例？Y/N', defVal: 'Y' }) === 'Y';
	console.log('clone template ...');
	childProcess.exec(`git clone https://github.com/DWarrior222/es-next.git ${pathname}`, err => {
		console.log('clone success');
		if (err !== null) {
			console.log('exec err: ' + err);
			return;
		}
		const curPath = path.resolve(process.cwd(), pathname);
		console.log(`remove ${curPath}/.git ...`);
		deleteDir(curPath + '/.git');
		if (!isSaveExample) deleteDir(curPath + '/src/example');
		console.log('remove success');
	});
});

program.parse(process.argv);