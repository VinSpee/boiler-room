
module.exports = function (gulp, task_name, deps, in_files, out_files, opts) {
	const modernizr = require('gulp-modernizr');

	gulp.task(task_name, function () {
		return gulp.src(in_files)
		.pipe(modernizr({
			options: [
				'setClasses',
				'addTest',
				'html5printshiv',
				'testProp',
				'fnBind'
			]
		}))
		.pipe(gulp.dest(out_files));
	});
};

