import gulp from 'gulp';
import {plugins} from '../config/plugins.js';

export const videos = () => {
	return gulp.src('src/videos/**/*.*')
		.pipe(gulp.dest('dist/videos'))
}
