import gulp from 'gulp';
import clean from './gulp/tasks/clean';
import server from './gulp/tasks/server';
import config from './gulp/config';
import { scriptsBuild, scriptsWatch } from './gulp/tasks/scripts';

config.setEnv();

export const build = gulp.series(
  clean,
  scriptsBuild,
);

export const watch = gulp.series(
  build,
  server,
  scriptsWatch,
);