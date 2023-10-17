import htmlmin from 'gulp-htmlmin';
import htmlImgToPicture from "gulp-html-img-to-picture";
import versionNumber from "gulp-version-number";
import prettyHtml from "gulp-pretty-html";

export const html = () => {
	return app.gulp.src(app.path.src.html)
		.pipe(app.plugins.plumberNotify('HTML'))
		.pipe(app.plugins.fileinclude())
		.pipe(app.plugins.replace(/@img\//g, 'img/'))
		.pipe(htmlImgToPicture({
				imgFolder: app.path.build.html,
				extensions: ['.jpg', '.jpeg', '.png'],
				ignoreClassname: 'img-ignore',
				ignoreAttribute: 'data-ignore',
				pictureClassAttribute: 'data-picture-class',
				logger: true,
				sortBySize: true,
				// filterUnexistedImages: false,
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
			})
		)
		.pipe(app.plugins.if(
			app.isBuild,
			htmlmin({ collapseWhitespace: true })
		))
		.pipe(app.plugins.if(
			app.isDev,
			prettyHtml({
				indent_size: 2,
				// indent_char: ' ', // если нужны пробелы вместо табов
				indent_with_tabs: '-c',
				indent_inner_html: true,
				end_with_newline: true,
				unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br'],
			})
		))
		.pipe(app.plugins.if(
			app.isBuild,
			versionNumber({
				'value' : '%DT%',
				'append' : {
					'key' : '_v',
					'cover' : 0,
					'to' : [
						'css',
						'js'
					]
				},
				'output' : {
					'file' : 'gulp/version.json'
				}
			})
		))
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.sync.stream())
}
