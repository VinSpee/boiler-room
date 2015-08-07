module.exports = function (gulp, task_name, deps, in_files, out_files, opts, reload) {
	const browserify = require('browserify');
	const source = require('vinyl-source-stream');
	const buffer = require('vinyl-buffer');
	const babelify = require('babelify');
	const plumber = require('gulp-plumber');
	const sourcemaps = require('gulp-sourcemaps');

	gulp.task(task_name, deps, () => {
		browserify({
			entries: in_files,
			debug: true
		})
		.transform(babelify)
		.bundle()
		.pipe(source('app.js'))
		.pipe(plumber())
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(out_files))
		.pipe(reload({stream: true}));
	});

};
