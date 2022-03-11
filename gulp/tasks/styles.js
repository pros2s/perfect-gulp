import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import plumber from 'gulp-plumber';
import gcmq from 'gulp-group-css-media-queries';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import gulpif from 'gulp-if';
import config from '../config';

const sass = gulpSass(dartSass);

export const scssBuild = () => (
  gulp.src(`${config.src.scss}/main.scss`, { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulpif(config.isProd, gcmq()))
    .pipe(gulpif(config.isProd, autoprefixer()))
    .pipe(gulpif(config.isProd, cleanCSS({ level: 2 })))
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest(config.dest.css, { sourcemaps: true }))
);

export const scssWatch = () => gulp.watch(`${config.src.scss}/**/*.scss`, scssBuild);