import gulp from 'gulp';
import {plugins} from '../config/plugins.js';

export const tastTemplate = () => {
  return gulp.src('src/')
		.pipe(gulp.dest('dist/'))
}
