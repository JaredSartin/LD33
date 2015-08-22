var changed    = require('gulp-changed');
var gulp       = require('gulp');
var config     = require('../config');

gulp.task('data', function() {
  var g = gulp.src(config.data.src);

  if(config.builds) {
    for(i in config.builds) {
      var dest = config.data.dest.split("/")
      dest.splice(-1, 0, config.builds[i]);
      dest = dest.join("/");
      g.pipe(changed(dest)) // Ignore unchanged files
      g.pipe(gulp.dest(dest));
    }
  } else {
    g.pipe(changed(config.data.dest)) // Ignore unchanged files
    g.pipe(gulp.dest(config.data.dest));
  }
});
