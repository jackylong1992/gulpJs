'use strict';
var concat = require('gulp-concat');
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyjs = require('gulp-js-minify');
var sourcemaps = require('gulp-sourcemaps');
var pump = require('pump');
var del = require('del');
var uglify = require('gulp-uglify');
var uglifyjs = require("uglify-js");
var composer = require('gulp-uglify/composer');
var minify = composer(uglifyjs, console);
var options = {
    compress : {
        collapse_vars : true
    }
}

/*scripts:development
* minify: disable
* souremaps: enable
* concat: enable
*/
gulp.task('scripts:development', function() {
    /*in this scenario use minifijs() */
    // return gulp.src('./src/script/*.js')
    //     .pipe(sourcemaps.init())
    //     .pipe(concat('app.js'))
    //     .pipe(sourcemaps.write())
    //     //.pipe(minifyjs())
    //     .pipe(gulp.dest('./dist/'));

    /*in this scenario use uglify-js() which is much more powerfull with option */
    pump([
        gulp.src(['./src/vendor/jquery.min.js',
        './src/vendor/angular.min.js',
        './src/script/*.js']), // try to control the order
        sourcemaps.init(),
        concat('app.js'),
        minify(options),
        sourcemaps.write(),
        gulp.dest('./dist/')
    ]);
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
        .pipe(gulp.dest('./dist/*'));
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

gulp.task('clean', function() {
    return del(['dist/*']);
});

gulp.task('default', ['clean','scripts:development', 'html', 'sass', 'watch:development']);
gulp.task('release', ['clean','scripts:release', 'html', 'sass', 'watch:release']);
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