var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    del = require('del');
/*    browserSync = require("browser-sync"),
    reload = browserSync.reload;*/


var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
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

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 3000,
    logPrefix: "Mi4a"
};

gulp.task('watch', function() {
    gulp.watch('public/index.html', ['html:build']);
    gulp.watch('public/stylesheets/*.css', ['css:build']);
    gulp.watch('public/parts/*.*/*.js', ['js:build']);
    gulp.watch('public/images/*.*', ['img:build']);
});

gulp.task('html:build', function() {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html));
});

gulp.task('css:build', function(){
    return gulp.src(path.src.css)
        .pipe(gulp.dest(path.build.css))
});

gulp.task('js:build', function() {
    gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js));
});

gulp.task('img:build', function() {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img));
});

gulp.task('clean', function() {
    return del.sync('build');
});