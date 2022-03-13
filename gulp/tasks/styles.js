import gulp from 'gulp';
import notify from 'gulp-notify';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import plumber from 'gulp-plumber';
import gcmq from 'gulp-group-css-media-queries';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import gulpif from 'gulp-if';
import smartGrid from 'smart-grid';
import importFresh from 'import-fresh';
import sassGlob from 'gulp-sass-glob';
import config from '../config';

const SMART_GRID_CONFIG_NAME = 'smart-grid-config.js';

const sass = gulpSass(dartSass);

const scssBuild = () => (
  gulp.src(`${config.src.scss}/main.scss`, { sourcemaps: config.isDev })
    .pipe(plumber({
      errorHandler: (err) => {
        notify.onError({
          title: 'SCSS Error',
          message: 'Error: <%= error.message %>',
        })(err);
        this.emit('end');
      },
    }))
    .pipe(sassGlob())
    .pipe(sass({
      includePaths: ['./node_modules'],
    }))
    .pipe(gulpif(config.isProd, gcmq()))
    .pipe(gulpif(config.isProd, autoprefixer()))
    .pipe(gulpif(config.isProd, cleanCSS({ level: 2 })))
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest(config.dest.css, { sourcemaps: config.isDev }))
);

const smartGridBuild = (callback) => {
  const smartGridConfig = importFresh(`../../${SMART_GRID_CONFIG_NAME}`);
  smartGrid(`${config.src.scss}/generated`, smartGridConfig);

  callback();
};

export const stylesBuild = gulp.series(smartGridBuild, scssBuild);

export const stylesWatch = () => {
  gulp.watch(`${config.src.scss}/**/*.scss`, scssBuild);
  gulp.watch(`./${SMART_GRID_CONFIG_NAME}`, smartGridBuild);
};