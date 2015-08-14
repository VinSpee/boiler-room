module.exports = function (gulp, task_name, deps, in_files, out_files, opts) {
	const plumber = require('gulp-plumber');
	const sprites = require('gulp-svg-sprite');

	gulp.task(task_name, function () {
		const config = {
			shape: {
				transform: [
					{
						svgo: {
							plugins: [
								{ cleanupIDs: false },
								{ removeDimensions: true },
								{ removeAttrs: { attrs: '(fill|stroke)' } }
							]
						}
					}
				]
			},
			mode: {
				symbol: {
					dest: '.',
					prefix: '.icon-%s',
					sprite: './icons.svg'
				}
			}
		};
		return gulp.src(in_files)
		.pipe(plumber())
		.pipe(sprites(config))
		.pipe(gulp.dest(out_files));
	});

};
