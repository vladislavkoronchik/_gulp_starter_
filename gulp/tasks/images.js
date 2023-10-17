import avif from 'gulp-avif';
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export const images = () => {
	if (app.isDev) {
		return app.gulp.src(app.path.src.images)
			.pipe(app.plugins.plumberNotify('IMAGES'))
			.pipe(app.gulp.dest(app.path.build.images))
			.pipe(app.gulp.src(app.path.src.svg))
			.pipe(app.gulp.dest(app.path.build.images))
			.pipe(app.plugins.sync.stream());
	}

	return app.gulp.src(app.path.src.images)
		.pipe(app.plugins.plumberNotify('IMAGES'))
		.pipe(app.plugins.newer(app.path.build.images))
		.pipe(avif({ quality: 50 }))
		.pipe(app.gulp.dest(app.path.build.images))

		.pipe(app.gulp.src(app.path.src.images))
		.pipe(app.plugins.newer(app.path.build.images))
		.pipe(webp())
		.pipe(app.gulp.dest(app.path.build.images))

		.pipe(app.gulp.src(app.path.src.images))
		.pipe(app.plugins.newer(app.path.build.images))
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: true}],
			interlaced: true,
			optimizationLevel: 3
		}))
		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(app.gulp.src(app.path.src.svg))
		.pipe(app.gulp.dest(app.path.build.images))

		.pipe(app.plugins.sync.stream());
}
