import concat from 'gulp-concat';
import browserSync from 'browser-sync';
import fileinclude from 'gulp-file-include';

const sync = browserSync.create();

export const plugins = {
  concat,
  sync,
  fileinclude,
}