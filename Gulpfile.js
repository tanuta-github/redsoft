'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

gulp.task('sass', function () {
    return gulp.src('./src/styles/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(reload({stream:true}));
});

gulp.task('pug', function() {
    return gulp.src("./src/*.pug")
        .pipe(pug())
        .pipe(gulp.dest("./dist/"))
        .pipe(reload({stream:true}));
});

gulp.task('images', function() {
    return gulp.src("./src/images/*.*")
        .pipe(gulp.dest("./dist/images"))
        .pipe(reload({stream:true}));
});

gulp.task('fonts', function() {
    return gulp.src("./src/fonts/**/*.*")
        .pipe(gulp.dest("./dist/fonts"))
        .pipe(reload({stream:true}));
});

var scripts = ['./src/scripts/*.js'];

gulp.task('scripts', function() {
    return gulp.src(scripts)
        //.pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(reload({stream:true}));
});

gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

  gulp.watch(['./src/styles/*.*'], ['sass']);
  gulp.watch('./src/**/*.pug', ['pug']);
  gulp.watch(['./src/images/*.*', './src/images/**/*.*'], ['images']);
  gulp.watch(scripts, ['scripts']);
});

gulp.task('build', [
    'sass', 'pug', 'scripts', 'images', 'fonts'
]);

