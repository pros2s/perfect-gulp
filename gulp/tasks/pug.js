import gulp from 'gulp';
import notify from 'gulp-notify';
import pug from 'gulp-pug';
import gulpif from 'gulp-if';
import {setup as emittySetup} from '@zoxon/emitty';
import plumber from 'gulp-plumber';
import pugIncludeGlob from 'pug-include-glob';
import config from '../config';

const emittyPug = emittySetup(config.src.pug, 'pug', {
  makeVinylFile: true
});

global.isPugWatch = false;
global.emittyChangedFile = {
  path: '',
  stats: null
};

export const pugBuild = () =>
  gulp.src(`${config.src.pug}/*.pug`)
    .pipe(plumber({
      errorHandler: (err) => {
        notify.onError({
          title: 'PUG Error',
          message: 'Error: <%= error.message %>'
        })(err);
        this.emit('end');
      }
    }))
    .pipe(
      gulpif(
        global.isPugWatch,
        emittyPug.stream(
          global.emittyChangedFile.path,
          global.emittyChangedFile.stats,
        ),
      ),
    )
    .pipe(pug(
      {
        pretty: config.isDev,
        plugins: [pugIncludeGlob()]
      }))
    .pipe(gulp.dest(config.dest.html));

export const pugWatch = () => {
  global.isPugWatch = true;
  gulp.watch(`${config.src.pug}/**/*.pug`, pugBuild)
    .on('all', (event, filepath, stats) => {
      global.emittyChangedFile = {
        path: filepath,
        stats
      };
    });
};
