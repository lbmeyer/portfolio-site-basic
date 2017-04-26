var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin'),
	browsersync = require('browser-sync').create();

gulp.task('css', function() {
	return gulp.src('src/sass/**/*.scss')
		.pipe(sourcemaps.init())
	    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 version']
		}))
		.pipe(sourcemaps.write('./maps'))
	    .pipe(gulp.dest('dist/css'))
		.pipe(browsersync.stream())
});

gulp.task('images', function() {
		return gulp.src('src/images/*')
			.pipe(imagemin())
			.pipe(gulp.dest('dist/images'))
});

gulp.task('copy', function() {
	return gulp.src('src/*html')
	    .pipe(gulp.dest('dist'))
		.pipe(browsersync.stream())
});

gulp.task('browsersync', function() {
		browsersync.init({
			server: {
				baseDir: 'dist'
			}
		})
});

gulp.task('watch', ['browsersync', 'css'], function() {
	gulp.watch('src/sass/**/*.scss', ['css']); 
	gulp.watch('src/*html', ['copy']);
	// if scss files are changed, run 'css'. If html file changes, run 'copy'
	
});