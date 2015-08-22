var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
// var config       = require('../config').sass;
var config       = require('../config');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', ['images'], function () {
  var g = gulp.src(config.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass(config.sass.settings))
    .on('error', handleErrors)
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({ browsers: ['last 2 version'] }));

  if(config.builds) {
    for(i in config.builds) {
      g.pipe(gulp.dest(config.sass.dest + "/" + config.builds[i]))
    }
  } else {
    g.pipe(gulp.dest(config.sass.dest))
  }
  g.pipe(browserSync.reload({stream:true}));
});
