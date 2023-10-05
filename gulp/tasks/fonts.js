import gulp from 'gulp';
import {plugins} from '../config/plugins.js';

export const fonts = () => {
	return gulp.src('src/fonts/*.*')
		.pipe(gulp.dest('dist/fonts'))
}
