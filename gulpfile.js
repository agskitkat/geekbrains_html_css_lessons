'use strict';

var gulp = require('gulp');
var scss = require('gulp-sass');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var rigger = require('gulp-rigger');

gulp.task('scss', function () {
        gulp.src(['scss/*.scss'])
            //.pipe(sourcemaps.init())
            .pipe(scss().on('error', scss.logError))
            //.pipe(sourcemaps.write())
            .pipe(concat('styles.min.css'))
            .pipe(minifyCSS({
                keepBreaks: false
             }))
            .pipe(gulp.dest('css'));
});

gulp.task('scss:watch', function () {
    gulp.watch(['scss/*.scss', 'scss/*/*.scss'], ['scss']);
});


// Build HTML files
gulp.task('html', function () {
    gulp.src(['html/*.html'])
        .pipe(rigger())
        .pipe(gulp.dest(''));
});
gulp.task('html:watch', function () {
    gulp.watch(['html/*.html','html/*/*.html'], ['html']);
});



gulp.task('clean', function() {
    return gulp.src(['css'], {read: false})
        .pipe(clean());
});

gulp.task('default', ['clean'], function() {
    gulp.start('scss:watch', 'html:watch', 'scss', 'html');
});