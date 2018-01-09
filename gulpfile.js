'use strict';
var concat = require('gulp-concat');
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyjs = require('gulp-js-minify');
var sourcemaps = require('gulp-sourcemaps');

/*scripts:development
* minify: disable
* souremaps: enable
* concat: enable
*/
gulp.task('scripts:development', function() {
    return gulp.src('./src/script/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        //.pipe(minifyjs())
        .pipe(gulp.dest('./dist/'));
});

/*scripts:release
* minify: enable
* souremaps: disable
* concat: enable
*/
gulp.task('scripts:release', function() {
    return gulp.src('./src/script/*.js')
        .pipe(concat('app.js'))
        .pipe(minifyjs())
        .pipe(gulp.dest('./dist/'));
});



gulp.task('sass', function () {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('html', function () {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/'));
});
  
gulp.task('watch:development', function () {
    gulp.watch('./src/sass/*.scss', ['sass']);
    gulp.watch('./src/script/*.js', ['scripts:development']);
    gulp.watch('./src/*.html', ['html']);
});

gulp.task('watch:release', function () {
    gulp.watch('./src/sass/*.scss', ['sass']);
    gulp.watch('./src/script/*.js', ['scripts:release']);
    gulp.watch('./src/*.html', ['html']);
});

gulp.task('development', ['scripts:development', 'html', 'sass', 'watch:development']);
gulp.task('release', ['scripts:release', 'html', 'sass', 'watch:release']);

/*
* there is no source map at this time
* install gulp-sourcemaps
* 
*/

/**
 * there is no minify at this time
 * install minify plugin:
 * https://www.npmjs.com/package/gulp-js-minify
 */