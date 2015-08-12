import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const CSS_NAMESPACE = require('./package.json').config.namespace;
//require('./lib/task')(gulp, 'name', [deps], [in_files], 'out-path', {opts});
require('./lib/lint-styles')(gulp, 'lint:styles', null, ['app/styles/**/*.css', './web_modules/**/*.css'], null, {namespace: CSS_NAMESPACE});
require('./lib/styles')(gulp, 'styles', ['lint:styles'], 'app/styles/*.css', '.tmp/styles', './app/images/icons', reload);
require('./lib/lint-scripts')(gulp, 'lint:scripts', null, 'app/scripts/**/*.js', null, null, reload);
require('./lib/scripts')(gulp, 'scripts', ['lint:scripts'], 'app/scripts/main.js', '.tmp/scripts', null, reload);
require('./lib/modernizr')(gulp, 'modernizr', null, 'app/scripts/**/*.js', '.tmp/scripts', null, reload);
require('./lib/sprites')(gulp, 'sprites', null, 'app/images/icons/*.svg', '.tmp/images', null, reload);

gulp.task('html', ['styles', 'modernizr', 'scripts'], () => {
	const assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

	return gulp.src('app/*.html')
	.pipe(assets)
	.pipe($.if('*.js', $.uglify()))
	.pipe(assets.restore())
	.pipe($.useref())
	.pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
	.pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
	return gulp.src('app/images/**/*')
	.pipe($.if($.if.isFile, $.cache($.imagemin({
		progressive: true,
		interlaced: true,
		// don't remove IDs from SVGs, they are often used
		// as hooks for embedding and styling
		svgoPlugins: [{cleanupIDs: false}]
	}))
	.on('error', function (err) {
		console.log(err);
		this.end();
	})))
	.pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
	return gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('.tmp/fonts'))
	.pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
	return gulp.src([
		'app/*.*',
		'!app/*.html'
	], {
		dot: true
	}).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['html', 'sprites', 'fonts'], () => {
	browserSync({
		notify: true,
		port: 9000,
		server: {
			baseDir: ['.tmp', 'app']
		}
	});

	gulp.watch([
		'app/*.html',
		'.tmp/images/**/*',
		'.tmp/scripts/**/*.js',
		'.tmp/fonts/**/*'
	]).on('change', reload);

	gulp.watch(['app/scripts/**/*.js', 'web_modules/**/*.js'], ['scripts']);
	gulp.watch(['app/styles/**/*.css', 'web_modules/**/*.css'], ['styles']);
	gulp.watch('app/fonts/**/*', ['fonts']);
});

gulp.task('serve:dist', () => {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['dist']
		}
	});
});

gulp.task('serve:test', () => {
	browserSync({
		notify: false,
		port: 9000,
		ui: false,
		server: {
			baseDir: 'test'
		}
	});

	gulp.watch('test/spec/**/*.js').on('change', reload);
	gulp.watch('test/spec/**/*.js', ['lint:test']);
});

gulp.task('build', ['html', 'sprites', 'images', 'fonts', 'extras'], () => {
	return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
	gulp.start('build');
});
