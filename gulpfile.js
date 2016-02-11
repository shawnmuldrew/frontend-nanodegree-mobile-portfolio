var gulp        = require("gulp");
    htmlmin     = require("gulp-htmlmin"),
    cssmin      = require("gulp-cssmin"),
    rename      = require("gulp-rename"),
    uglify      = require("gulp-uglify"),
    inlineCss   = require('gulp-inline-css');

const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

var config = {
    paths: {
        html: {
            src:  ["src/**/*.html"],
            dest: "dest"
        },
    }
}
 
gulp.task("htmlmin", function(){
    return gulp.src(config.paths.html.src)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(config.paths.html.dest));
});

gulp.task('cssmin', function () {
  gulp.src('src/**/*.css')
    .pipe(cssmin())
//    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dest'));
    });

gulp.task('jsmin', function(){
  gulp.src('src/**/*.js')
    .pipe(uglify())
//    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dest'));
});

 
gulp.task('inlinecss', function() {
    return gulp.src('src/index.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('dest'));
});

gulp.task('imagemin1', function() {
    return gulp.src('src/img/*.{png,jpg,jpeg,gif}')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dest/img'));
});

gulp.task('imagemin2', function() {
    return gulp.src('src/views/images/*.{png,jpg,jpeg,gif}')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dest/views/images'));
});

gulp.task('default', ['inlinecss', 'htmlmin', 'cssmin' , 'jsmin', 'imagemin1', 'imagemin2']);
