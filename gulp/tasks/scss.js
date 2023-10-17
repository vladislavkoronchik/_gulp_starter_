import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import group_media from "gulp-group-css-media-queries";
import csso from 'gulp-csso';
import webpcss from 'gulp-webpcss';

const sass = gulpSass(dartSass);

export const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
		.pipe(app.plugins.plumberNotify('SCSS'))
		.pipe(sass({ outputStyle: 'expanded' }))
		.pipe(app.plugins.replace(/@img\//g, '../img/'))
		.pipe(app.plugins.if(
			app.isBuild,
			group_media()
		))
		.pipe(app.plugins.if(
			app.isBuild,
			webpcss({
				webpClass: '.webp',
				noWebpClass: '.no-webp'
			})
		))
		.pipe(app.plugins.if(
			app.isBuild,
			autoprefixer({
				grid: true,
				overrideBrowserslist: ["last 5 versions"]
			})
		))
		.pipe(app.plugins.if(
			app.isBuild,
			app.plugins.concat('style.css')
		))
		.pipe(app.plugins.if(
			app.isBuild,
			app.gulp.dest(app.path.build.css)
		))
		.pipe(app.plugins.if(
			app.isBuild,
			csso()
		))
		.pipe(app.plugins.concat('style.min.css'))
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.sync.stream())
}
