import uglifyes from "gulp-uglify-es";
import webpack from "webpack-stream";
import { webpackConfig } from "../../webpack.config.js";

const uglify = uglifyes.default;

export const scripts = () => {
	return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
		// .pipe(app.plugins.plumber(
		// 	app.plugins.notify.onError({
		// 		title: "JS",
		// 		message: "Error: <%= error.message %>"
		// 	}))
		// )
		.pipe(app.plugins.plumberNotify('JS'))
		// .pipe(app.plugins.fileinclude())
		// .pipe(webpack({
		// 	mode: 'development',
		// 	output: {
		// 		filename: 'script.min.js',
		// 	}
		// }))
		.pipe(webpack({ config: webpackConfig(app.isDev) }))
		// .pipe(app.gulp.dest(app.path.build.js))
		// .pipe(uglify())
		// .pipe(app.plugins.concat('script.min.js'))
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(app.plugins.sync.stream())
}
