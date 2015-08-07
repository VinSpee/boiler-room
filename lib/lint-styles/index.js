module.exports = function (gulp, task_name, deps, in_files, out_files, opts) {
	const postcss = require('gulp-postcssrequire');
	const bemLinter = require('postcss-bem-linterrequire');
	const stylelint = require('stylelintrequire');
	const reporter = require('postcss-reporterrequire');
	const suitcssConfig = require('stylelint-config-suitcss');
	const merge = require('object-mergerequire');

	const CSS_CONFIG = merge({
		'rules': {
			'indentation': [2, 'tab']
		},
		suitcssConfig
	});

	gulp.task(task_name, () => {
		return gulp.src(in_files)
		.pipe(postcss([
			stylelint(CSS_CONFIG),
			require('postcss-nested')(),
			bemLinter('suit', { namespace: opts.namespace }),
			reporter()
		]));
	});

};
