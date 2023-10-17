import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

global.app = { 
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path,
	gulp,
	plugins
}

import { copy } from './gulp/tasks/copy.js';
import { html } from './gulp/tasks/html.js';
import { scss } from './gulp/tasks/scss.js';
import { scripts } from './gulp/tasks/scripts.js';
import { images } from './gulp/tasks/images.js';
import { sprite } from './gulp/tasks/sprite.js';
import { clean } from './gulp/tasks/clean.js';
import { copyWoff, fontsStyle, otfToTtf, ttfToWoff } from './gulp/tasks/fonts.js';

const watching = () => {
	plugins.sync.init({
		server: app.path.build.html
	})

	gulp.watch(app.path.watch.files, copy)
	gulp.watch(app.path.watch.html, html)
	gulp.watch(app.path.watch.scss, scss)
	gulp.watch(app.path.watch.js, scripts)
	gulp.watch(app.path.watch.images, images)

	// Слежение за шрифтами и их автоматическая обработка.
	// Раскомментировать, если ваш заказчик просит поиграться со шрифтами.
	// В функции fontsStyle нужно убедиться, чтобы условие на 52-ой строке было закомментировано.
	
	gulp.watch(app.path.watch.fonts.otf, { queue: false }, otfToTtf)
	gulp.watch(app.path.watch.fonts.ttf, { queue: false }, gulp.series(ttfToWoff, copyWoff))
	gulp.watch(`${app.path.watch.fonts.buffer}*.woff2`, { queue: true, delay: 500 }, fontsStyle)
}

const fonts = gulp.series(otfToTtf, ttfToWoff, copyWoff, fontsStyle);

const mainTask = gulp.series(fonts, images, sprite, gulp.parallel(copy, scss, html, scripts));
const build = gulp.series(clean, mainTask);
const dev = gulp.series(build, watching);

export {clean};
export {images};
export {sprite};
export {copyWoff};
export {otfToTtf};
export {ttfToWoff};
export {fonts};
export {build};
export default dev;
