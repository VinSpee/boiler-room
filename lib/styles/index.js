module.exports = function (gulp, task_name, deps, in_files, out_files, opts, reload) {
	const plumber = require('gulp-plumber');
	const sourcemaps = require('gulp-sourcemaps');
	const cssnext = require('gulp-cssnext');

	gulp.task(task_name, deps, () => {
		return gulp.src(in_files)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(cssnext({
			compress: true,
			plugins: [
				require('postcss-nested'),
				require('postcss-svg')({
					paths: [opts],
					defaults: ['[fill]: #000000']
				})
			]
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(out_files))
		.pipe(reload({stream: true}));
	});

};
