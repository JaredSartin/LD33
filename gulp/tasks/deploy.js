var gulp   = require('gulp');
var ghPages = require('gulp-gh-pages');

gulp.task('deploy', ['build'], function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});
