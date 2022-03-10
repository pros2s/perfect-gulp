import gulp from 'gulp';
import clean from './gulp/tasks/clean';
import server from './gulp/tasks/server';
import config from './gulp/config';
import { scriptsBuild, scriptsWatch } from './gulp/tasks/scripts';
import { pugBuild, pugWatch } from './gulp/tasks/pug';
import { scssBuild, scssWatch } from './gulp/tasks/styles';
import { assetsBuild, assetsWatch } from './gulp/tasks/assets';
import { imagesBuild, imagesWatch } from './gulp/tasks/images';
import { spritesBuild, spritesWatch } from './gulp/tasks/sprites';

config.setEnv();

export const build = gulp.series(
  clean,
  gulp.parallel(
    scriptsBuild,
    pugBuild,
    scssBuild,
    assetsBuild,
    imagesBuild,
    spritesBuild,
  ),
);

export const watch = gulp.series(
  build,
  server,

  gulp.parallel(
    scriptsWatch,
    pugWatch,
    scssWatch,
    assetsWatch,
    imagesWatch,
    spritesWatch,
  ),
);