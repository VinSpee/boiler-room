import postcss from 'gulp-postcss';
import bemLinter from 'postcss-bem-linter';
import stylelint from 'stylelint';
import reporter from 'postcss-reporter';
import suitcssConfig from 'stylelint-config-suitcss';
import merge from 'object-merge';

module.exports = function (gulp, task_name, deps, in_files, out_files, opts) {

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
