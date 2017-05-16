var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    wrap = require('gulp-wrap'),
    del = require('del');


var path = {
    build: {
        html: 'build/',
        js: 'public/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'public/index.html',
        js: 'public/parts/**/*.js',
        style: 'public/stylesheets/*.css',
        img: 'public/images/**/*.*',
        fonts: 'public/fonts/**/*.*'
    },
    watch: {
        html: 'public/*.html',
        js: 'public/**/*.js',
        style: 'public/stylesheets/*.css',
        img: 'public/images/**/*.*',
        fonts: 'public/fonts/**/*.*'
    },
    clean: './build'
};

gulp.task('default', ['watch']);

gulp.task('watch', function() {
    gulp.watch('public/index.html', ['html:build']);
    gulp.watch('public/stylesheets/*.css', ['css:build']);
    gulp.watch('public/parts/*.js', ['js:build']);
    gulp.watch('public/images/*.*', ['img:build']);
});

const WRAP_TEMPLATE = '(function(){\n"use strict";\n<%= contents %>\n})();';

gulp.task('html:build', function() {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html));
});

gulp.task('css:build', function(){
    gulp.src(path.src.style)
        .pipe(gulp.dest(path.build.css));
});

gulp.task('js:build', function() {
    gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(path.build.js));1
});

gulp.task('img:build', function() {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img));
});

gulp.task('clean', function() {
    return del.sync('build');
});

gulp.task('build', ['clean', 'html:build', 'css:build', 'js:build', 'img:build'], function() {

    console.log('main project files created');

});