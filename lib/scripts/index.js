import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import babelify from 'babelify';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';

module.exports = function (gulp, task_name, deps, in_files, out_files, opts, reload) {

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
