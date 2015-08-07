import eslint from 'gulp-eslint';

module.exports = function (gulp, task_name, deps, in_files, out_files, opts, reload) {
	gulp.task(task_name, () => {
		return gulp.src(in_files)
		.pipe(reload({stream: true, once: true}))
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
	});
};
