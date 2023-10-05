import gulp from 'gulp';
import {plugins} from '../config/plugins.js';

export const images = () => {
	return gulp.src('src/img/**/*.{jpg,jpeg,png,svg,webp}')
		.pipe(gulp.dest('dist/img'))
}
