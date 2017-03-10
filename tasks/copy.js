'use strict';

const gulp    = require('gulp'),
      flatten = require('gulp-flatten'),
      paths   = require('./paths'),
      SRC     = [
        './app/manifest.json',
      ],
      FONTS   = [
      	'./app/bower_components/font-awesome/fonts/*'
      ];

/**
 * Copy main files to dist folder
 */
gulp.task('copy', ['usemin', 'clean:dist'], () => {
    const stream =
    	gulp.src(SRC, { base: './app/' })
	        .pipe(gulp.dest(paths.dist))
	        .pipe(gulp.dest(paths.docs));

        gulp.src(FONTS, { base: './app/' })
        	.pipe(flatten())
    		.pipe(gulp.dest(paths.dist + '/assets/fonts/'))
    		.pipe(gulp.dest(paths.docs + '/assets/fonts/'));

    return stream;
});
