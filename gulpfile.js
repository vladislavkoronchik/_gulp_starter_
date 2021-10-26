const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const group_media = require("gulp-group-css-media-queries");
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const uglify = require("gulp-uglify-es").default;
const del = require('del');
const sync = require('browser-sync').create();

const html = () => {
	return src('src/**.html')
		.pipe(fileinclude({
			prefix: '@@'
		}))
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(dest('dist'))
}

const scss = () => {
	return src('src/scss/style.scss')
		.pipe(sass())
		.pipe(group_media())
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			// grid: true,
			// overrideBrowserslist: ["last 5 versions"],
			// cascade: true
		}))
		.pipe(concat('style.css'))
		.pipe(dest('dist/css'))
		.pipe(csso())
		.pipe(concat('style.min.css'))
		.pipe(dest('dist/css'))
}

const js = () => {
	return src('src/js/script.js')
		.pipe(fileinclude({
			prefix: '@@'
		}))
		.pipe(dest('dist/js'))
		.pipe(uglify(/* options */))
		.pipe(concat('script.min.js'))
		.pipe(dest('dist/js'))
}

const images = () => {
	return src('src/img/**/*.{jpg,jpeg,png,svg,webp}')
		.pipe(dest('dist/img'))
}

const videos = () => {
	return src('src/videos/**/*.*')
		.pipe(dest('dist/videos'))
}

const fonts = () => {
	return src('src/fonts/*.*')
		.pipe(dest('dist/fonts'))
}

const clean = () => {
	return del('dist')
}

const watching = () => {
	sync.init({
		server: './dist'
	})

	watch('src/**/*.html', series(html)).on('change', sync.reload)
	watch('src/scss/*.scss', series(scss)).on('change', sync.reload)
	watch('src/js/*.js', series(js)).on('change', sync.reload)
	watch('src/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}', series(images)).on('change', sync.reload)
	watch('src/fonts/**/*.{ttf,otf,woff,woff2}', series(fonts)).on('change', sync.reload)
}

const build = series(clean, scss, html, js, images, videos, fonts);
const serve = series(build, watching);

exports.clean = clean;
exports.images = images;
exports.videos = videos;
exports.fonts = fonts;
exports.build = build;
exports.serve = serve;
exports.default = serve;