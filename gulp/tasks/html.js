import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import imgToPicture from "gulp-html-img-to-picture";
import {plugins} from '../config/plugins.js';

export const html = () => {
	return gulp.src('src/**.html')
		.pipe(plugins.fileinclude({
			prefix: '@@'
		}))
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(imgToPicture({
			imgFolder: './dist',
			extensions: ['.jpg', '.jpeg', '.png'],
			ignoreClassname: 'img-ignore',
			ignoreAttribute: 'data-ignore',
			pictureClassAttribute: 'data-picture-class',
			sourceExtensions: [
        {
            extension: 'avif',
            mimetype: 'image/avif',
        },
        {
            extension: 'webp',
            mimetype: 'image/webp',
        },
			],
		}))
		.pipe(gulp.dest('dist'))
}
