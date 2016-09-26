'use strict';

const gulp  = require('gulp'),
      paths = require('./paths'),
      SRC   = [
        './app/assets/site.css',
        './app/manifest.json',
      ],
      fonts = './app/bower_components/font-awesome/fonts/**/*.{ttf,woff,woff2,eof,svg}';

/**
 * Copy main files to dist folder
 */
gulp.task('copy', ['usemin', 'clean:dist'], () => {
    gulp.src(fonts)
        .pipe(gulp.dest(paths.dist + '/fonts'));

    const stream = gulp.src(SRC, { base: './app/' })
        .pipe(gulp.dest(paths.dist));

    return stream;
});
