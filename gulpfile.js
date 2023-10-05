import gulp from 'gulp';
import {plugins} from './gulp/config/plugins.js';

import { html } from './gulp/tasks/html.js';
import { scss } from './gulp/tasks/scss.js';
import { scripts } from './gulp/tasks/scripts.js';
import { images } from './gulp/tasks/images.js';
import { videos } from './gulp/tasks/videos.js';
import { fonts } from './gulp/tasks/fonts.js';
import { clean } from './gulp/tasks/clean.js';

const watching = () => {
	plugins.sync.init({
		server: './dist'
	})

	gulp.watch('src/scss/*.scss', scss)
	gulp.watch('src/js/*.js', scripts)
	gulp.watch('src/**/*.html', html).on('change', plugins.sync.reload)
	gulp.watch('src/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}', gulp.series(images)).on('change', plugins.sync.reload)
	gulp.watch('src/fonts/**/*.{ttf,otf,woff,woff2}', gulp.series(fonts)).on('change', plugins.sync.reload)
}

const build = gulp.series(clean, gulp.parallel(scss, html, scripts, images, videos, fonts));
const serve = gulp.series(build, watching);

export {clean};
export {images};
export {videos};
export {fonts};
export {build};
export default serve;
