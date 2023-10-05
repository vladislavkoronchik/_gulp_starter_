import gulp from 'gulp';
import uglifyes from "gulp-uglify-es";
import {plugins} from '../config/plugins.js';

const uglify = uglifyes.default;

export const scripts = () => {
	return gulp.src('src/js/script.js')
		.pipe(plugins.fileinclude({
			prefix: '@@'
		}))
		.pipe(gulp.dest('dist/js'))
		.pipe(uglify(/* options */))
		.pipe(plugins.concat('script.min.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(plugins.sync.stream())
}
