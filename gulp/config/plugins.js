import concat from 'gulp-concat';
import browserSync from 'browser-sync';
import fileinclude from 'gulp-file-include';
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import replace from "gulp-replace";
import newer from 'gulp-newer';
import ifPlugin from 'gulp-if';

const sync = browserSync.create();

const plumberNotify = (taskName) => {
  return plumber({
    errorHandler: notify.onError({
      title: taskName,
      message: 'Error: <%= error.message %>',
    }),
  });
}

export const plugins = {
  concat,
  sync,
  fileinclude,
  replace,
  plumberNotify,
  newer,
  if: ifPlugin,
}
