import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import cssnext from 'gulp-cssnext';
import browserSync from 'browser-sync';
const reload = browserSync.reload;

module.exports = function (gulp, task_name, deps, in_files, out_files, opts) {

	gulp.task(task_name, deps, () => {
		return gulp.src(in_files)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(cssnext({
			compress: true,
			plugins: [
				require('postcss-nested')
			]
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(out_files))
		.pipe(reload({stream: true}));
	});

};
