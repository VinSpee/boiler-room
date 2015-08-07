import plumber from 'gulp-plumber';
import sprites from 'gulp-svg-sprite';

module.exports = function (gulp, task_name, deps, in_files, out_files, opts) {

	gulp.task(task_name, () => {
		const config = {
			log: 'verbose',
			shape: {
				transform: [
					{
						svgo: {
							plugins: [
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
