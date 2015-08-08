module.exports = function (gulp, task_name, deps, in_files, out_files, opts) {
	const postcss = require('gulp-postcss');
	const bemLinter = require('postcss-bem-linter');
	const stylelint = require('stylelint');
	const reporter = require('postcss-reporter');
	const suitcssConfig = require('stylelint-config-suitcss');
	const merge = require('object-merge');

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
