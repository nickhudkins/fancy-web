/*
  Prefer Simple Scripts to Large Gulp Files.
  We are using gulp simply to create / delete / update sentry releases.
  Please do not add additional build steps here.
*/

const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const gulpSentryRelease = require('gulp-sentry-release');
const config = require('../config');

const SENTRY_ORG_NAME = process.env.SENTRY_ORG_NAME;
const SENTRY_PROJECT_NAME = process.env.SENTRY_PROJECT_NAME;
const SENTRY_API_KEY = process.env.SENTRY_API_KEY;
console.log(SENTRY_API_KEY)

const opt = {
  API_URL: `https://app.getsentry.com/api/0/projects/${SENTRY_ORG_NAME}/${SENTRY_PROJECT_NAME}/`,
  API_KEY: SENTRY_API_KEY,
  debug: true,
  versionPrefix: 'v', // Append before the version number in package.json
};

const sentryRelease = gulpSentryRelease('../package.json', opt);

const sentrySrc = [path.join(config.assetsPath, '*.js.map')];

/*
    gulp sentry:release // Use package.json version
    gulp sentry:release -v 'version'
    gulp sentry:release --version 'version'
 */
gulp.task('sentry:release', () => {
  const version = gutil.env.version || gutil.env.v;
  return gulp
    .src(sentrySrc, { base: config.assetsPath })
    .pipe(sentryRelease.release(version));
});

/*
    gulp sentry:delete -v 'version'
    gulp sentry:delete --version 'version'
 */
gulp.task('sentry:delete', () => {
  const version = gutil.env.version || gutil.env.v;
  return gulp
    .src(sentrySrc, { base: config.assetsPath })
    .pipe(sentryRelease.deleteVersion(version));
});

/*
    gulp sentry:create -v 'version'
    gulp sentry:create --version 'version'
 */
gulp.task('sentry:create', () => {
  const version = gutil.env.version || gutil.env.v;
  return gulp
    .src(sentrySrc, { base: config.assetsPath })
    .pipe(sentryRelease.createVersion(version));
});
