var changed    = require('gulp-changed');
var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');
var config     = require('../config');

gulp.task('images', function() {
  var g = gulp.src(config.images.src);

  if(config.builds) {
    for(i in config.builds) {
      var dest = config.images.dest.split("/")
      dest.splice(-1, 0, config.builds[i]);
      dest = dest.join("/");
      g.pipe(changed(dest)) // Ignore unchanged files
      g.pipe(imagemin()) // Optimize
      g.pipe(gulp.dest(dest));
    }
  } else {
    g.pipe(changed(config.images.dest)) // Ignore unchanged files
    g.pipe(imagemin()) // Optimize
    g.pipe(gulp.dest(config.images.dest));
  }
});
