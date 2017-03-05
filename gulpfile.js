'use strict';

const gulp     = require('gulp'),
      sequence = require('gulp-sequence'),
      exec     = require('child_process').exec,
      reqDir   = require('require-dir');

// Require gulp tasks
const dir = reqDir('./tasks');


/**
 * Default task
 */
gulp.task('default', [
    'ng-template',
    'serve',
    'js-hint',
    'sass'
], () => {
    gulp.watch(dir.paths.js.src,  ['js-hint']);
    gulp.watch(dir.paths.html,    ['ng-template']);
    gulp.watch(dir.paths.sassAll, ['sass']);
});


/**
 * Test task
 */
gulp.task('test', [
    'js-hint',
    'code-style'
]);


/**
 * Build task
 */
gulp.task('build', [
    'ng-template',
    'sass',
    'copy',
    'image-min',
    'svg-min',
    'usemin'
]);


/**
 * Firebase Deploy task
 */
gulp.task('firebaseDeploy', function (cb) {
    exec('firebase deploy', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});


/**
 * Deploy task
 */
gulp.task('deploy',
    sequence(
        'build',
        'firebaseDeploy'
    )
);
