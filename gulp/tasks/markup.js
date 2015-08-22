var gulp = require('gulp');
var config = require('../config');

gulp.task('markup', function() {
  var g = gulp.src(config.markup.src);

  if(config.builds) {
    for(i in config.builds) {
      g.pipe(gulp.dest(config.markup.dest + "/" + config.builds[i]));
    }
  } else {
    g.pipe(gulp.dest(config.markup.dest));
  }
});
