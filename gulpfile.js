const path = require('path');
const { task, src, dest } = require('gulp');

task('build:icons', copyIcons);
task('build:assets', copyAssets);

function copyIcons() {
	const nodeSource = path.resolve('nodes', '**', '*.{png,svg}');
	const nodeDestination = path.resolve('dist', 'nodes');

	src(nodeSource).pipe(dest(nodeDestination));

	const credSource = path.resolve('credentials', '**', '*.{png,svg}');
	const credDestination = path.resolve('dist', 'credentials');

	return src(credSource).pipe(dest(credDestination));
}

function copyAssets() {
	// Copy Python files and other assets
	const nodeSource = path.resolve('nodes', '**', '*.{py,json}');
	const nodeDestination = path.resolve('dist', 'nodes');

	return src(nodeSource).pipe(dest(nodeDestination));
}
