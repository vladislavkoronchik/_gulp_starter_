import fs from 'fs';
import fonter from 'gulp-fonter';
import changed from 'gulp-changed';
import ttf2woff2 from 'gulp-ttf2woff2';

const fontWeightObj = {
	thin: 100,
	extralight: 200,
	light: 300,
	regular: 400,
	medium: 500,
	semibold: 600,
	bold: 700,
	extrabold: 800,
	heavy: 800,
	black: 900,
}

export const otfToTtf = () => {
  return app.gulp.src(app.path.src.fonts.otf)
    .pipe(app.plugins.plumberNotify('FONTS'))
		.pipe(changed(app.path.src.fonts.folder, {extension: '.ttf'}))
		.pipe(fonter({ formats: ['ttf'] }))
		.pipe(app.gulp.dest(app.path.src.fonts.folder))
}

export const ttfToWoff = () => {
  return app.gulp.src([app.path.src.fonts.ttf, app.path.src.fonts.otf])
    .pipe(app.plugins.plumberNotify('FONTS'))
		.pipe(changed(app.path.src.fonts.buffer, {extension: '.woff'}))
		.pipe(fonter({ formats: ['woff'] }))
		.pipe(app.gulp.dest(app.path.src.fonts.buffer))
		.pipe(app.gulp.src(app.path.src.fonts.ttf))
		.pipe(changed(app.path.src.fonts.buffer, {extension: '.woff2'}))
		.pipe(ttf2woff2())
		.pipe(app.gulp.dest(app.path.src.fonts.buffer))
}

export const copyWoff = () => {
	return app.gulp.src(app.path.src.fonts.woffTransfer)
		.pipe(app.plugins.plumberNotify('COPYWOFF'))
		.pipe(app.plugins.newer(app.path.build.fonts))
		.pipe(app.gulp.dest(app.path.build.fonts))
}

export const fontsStyle = () => {
	let fontsStyleFile = `${app.path.srcFolder}/scss/base/fonts.scss`;
	fs.readdir(app.path.src.fonts.buffer, function (err, fontsFiles) {
		if (err) {
			console.log(err);
			fs.writeFile(fontsStyleFile, '', cb);
		}
		else {
			if (fontsFiles) {
				// Раскомментировать следующее ниже условие, 
				// если важно не перезаписывать уже созданный файл fonts.scss
				// if (!fs.existsSync(fontsStyleFile)) {
					fs.writeFile(fontsStyleFile, '', cb);
					let newFileOnly;
					for (let i = 0; i < fontsFiles.length; i++) {
						let fontFileName = fontsFiles[i].split('.')[0];
						let fontFileExt = fontsFiles[i].split('.')[1];
						if (newFileOnly !== fontFileName) {
							if (fontFileExt === 'woff' || fontFileExt === 'woff2') {
								const [ fontName, fontWeightString = 'regular' ] = fontFileName.split('-');
								// switch (fontWeight.toLowerCase()) {
								// 	case 'thin':
								// 		fontWeight = 100;
								// 		break;
								// 	case 'extralight':
								// 		fontWeight = 200;
								// 		break;
								// 	case 'light':
								// 		fontWeight = 300;
								// 		break;
								// 	case 'medium':
								// 		fontWeight = 500;
								// 		break;
								// 	case 'semibold':
								// 		fontWeight = 600;
								// 		break;
								// 	case 'bold':
								// 		fontWeight = 700;
								// 		break;
								// 	case 'extrabold':
								// 	case 'heavy':
								// 		fontWeight = 800;
								// 		break;
								// 	case 'black':
								// 		fontWeight = 900;
								// 		break;
								// 	default:
								// 		fontWeight = 400;
								// 		break;
								// }
								const italicRegex = /italic/i;
								const fontWeight = fontWeightObj[fontWeightString.replace(italicRegex, '').toLowerCase()] || 400;
								const fontStyle = italicRegex.test(fontFileName) ? 'italic' : 'normal';
								fs.appendFile(fontsStyleFile, `@include font("${fontName}", "${fontFileName}", ${fontWeight}, "${fontStyle}");\r\n`, cb);
							}
						}
						newFileOnly = fontFileName;
					}
				// }
				// else {
				// 	console.log('Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить');
				// }
			}
		}
	});
	return app.gulp.src(`${app.path.srcFolder}`);
	function cb() {};
}
