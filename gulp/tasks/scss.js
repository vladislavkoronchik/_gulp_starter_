import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import group_media from "gulp-group-css-media-queries";
import csso from 'gulp-csso';
import {plugins} from '../config/plugins.js';

const sass = gulpSass(dartSass);

export const scss = () => {
	return gulp.src('src/scss/style.scss')
		.pipe(sass())
		.pipe(group_media())
		.pipe(autoprefixer({overrideBrowserslist: ["last 5 versions"]}))
		.pipe(plugins.concat('style.css'))
		.pipe(gulp.dest('dist/css'))
		.pipe(csso())
		.pipe(plugins.concat('style.min.css'))
		.pipe(gulp.dest('dist/css'))
		.pipe(plugins.sync.stream())
}
