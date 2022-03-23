import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';
import config from '../config';

export const scriptsBuild = () =>
  browserify(`${config.src.js}/main.js`,
    {
      debug: true
    })
    .transform('babelify',
      {
        presets: ['@babel/preset-env']
      })
    .bundle()
    .on('error', (error) => {
      console.log(error.stack);
      this.emit('end');
    })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulpif(config.isDev, sourcemaps.init(
      {
        loadMaps: true
      })))
    .pipe(gulpif(config.isProd, uglify()))
    .pipe(gulpif(config.isDev, sourcemaps.write()))
    .pipe(gulp.dest(config.dest.js));

export const scriptsWatch = () => gulp.watch(`${config.src.js}/**/*.js`, scriptsBuild);
