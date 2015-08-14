module.exports = function (gulp, task_name, deps, in_files, out_files, opts, reload) {
	const eslint = require('gulp-eslint');

	gulp.task(task_name, function () {
		return gulp.src(in_files)
		.pipe(reload({stream: true, once: true}))
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
	});
};
