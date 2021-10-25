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

const clean = () => {
	return del('dist')
}

const serve = () => {
	sync.init({
		server: './dist'
	})

	watch('src/**/**.html', series(html)).on('change', sync.reload)
	watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
	watch('src/js/**.js', series(js)).on('change', sync.reload)
}

exports.build = series(clean, scss, html, js);
exports.serve = series(clean, scss, html, js, serve);
exports.clean = clean;