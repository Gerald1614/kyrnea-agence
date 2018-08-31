'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var terser = require('gulp-terser');
var concat = require('gulp-concat');

    gulp.task('browser-sync', function () {
        var files = [
           './src/*.html',
           './src/stylus/*.css',
           './src/public/images/*.{png,jpg,gif,svg,jpeg}',
           './src/js/*.js'
        ];
     
        browserSync.init(files, {
           server: {
              baseDir: "./src"
           }
        });
     
     });
     

     // Images
     gulp.task('imagemin', () =>
     gulp.src('./src/public/images/*')
         .pipe(imagemin([
          imagemin.gifsicle({interlaced: true}),
          imagemin.jpegtran({progressive: true}),
          imagemin.optipng({optimizationLevel: 5}),
          imagemin.svgo({
              plugins: [
                  {removeViewBox: true},
                  {cleanupIDs: false}
              ]
          })
      ]))
         .pipe(gulp.dest('dist/images'))
 );

   // Gulp task to minify JavaScript files
gulp.task('scripts', function() {
  return gulp.src('./src/js/*.js')
    .pipe(concat('script.js'))
    // Minify the file
    .pipe(terser())
    // Output
    .pipe(gulp.dest('./dist/js'))
});

// Gulp task to minify CSS files
gulp.task('styles', function () {
  return gulp.src('./src/stylus/custom.css')
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest('./dist/css'))
});

// Gulp task to minify HTML files
gulp.task('pages', function() {
  return gulp.src(['./src/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./dist'));
});


gulp.task('clean', () => del(['dist']));

     // Default task
     gulp.task('default',['clean'], function () {
       runSequence(
        'browser-sync', 'imagemin', 'pages', 'scripts', 'styles'
       );
           
     });
     gulp.task('build',['clean'], function () {
      runSequence(
       'imagemin', 'pages', 'scripts', 'styles'
      );
          
    });
