'use strict';

const gulp  = require('gulp'),
      paths = require('./paths'),
      browserSync = require('browser-sync').create(),
      SRC   = './app',
      protocol = true;


/**
 * BrowserSync task
 */
gulp.task('serve', () => {
    browserSync.init({
        port: 9000,
        https: protocol,
        notify: true,
        injectChanges: true,
        minify: false,
        open: false,
        server: {
            baseDir: SRC
        }
    });

    // On change of files reload
    gulp.watch([
        paths.index,
        paths.js.src,
        paths.css,
        paths.sass
    ]).on('change', browserSync.reload);
});

/**
 * BrowserSync task
 */
gulp.task('serve:dist', () => {
    browserSync.init({
        port: 9000,
        https: protocol,
        notify: false,
        injectChanges: true,
        minify: true,
        open: false,
        server: {
            baseDir: paths.dist
        }
    });
});
