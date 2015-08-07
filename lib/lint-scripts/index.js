import eslint from 'gulp-eslint';
import gulpif from 'gulp-if';
import browserSync from 'browser-sync';
const reload = browserSync.reload;

module.exports = function (gulp, task_name, deps, in_files, out_files, opts) {
	gulp.task(task_name, () => {
		return gulp.src(in_files)
		.pipe(reload({stream: true, once: true}))
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(gulpif(!browserSync.active, eslint.failAfterError()));
	});
};
