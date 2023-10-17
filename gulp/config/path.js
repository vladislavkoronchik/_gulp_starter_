import * as nodePath from 'path';

const buildFolder = `./dist`;
const srcFolder = `./src`;
const rootFolder = nodePath.basename(nodePath.resolve());

export const path = {
  build: {
    html: `${buildFolder}/`,
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
  },
  src: {
    html: `${srcFolder}/*.html`,
    scss: `${srcFolder}/scss/main.scss`,
    js: `${srcFolder}/js/app.js`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,ico,webp,avif}`,
    svg: `${srcFolder}/img/**/*.svg`,
    svgicons: `${srcFolder}/svgicons/*.svg`,
    fonts: {
      all: `${srcFolder}/fonts/*.{ttf,otf,woff,woff2}`,
      otf: `${srcFolder}/fonts/*.otf`,
      ttf: `${srcFolder}/fonts/*.ttf`,
      woff: `${srcFolder}/fonts/*.{woff,woff2}`,
      folder: `${srcFolder}/fonts/`,
      buffer: `${srcFolder}/fonts/dist/`,
      woffTransfer: `${srcFolder}/fonts/dist/*.{woff,woff2}`,
    },
    files: `${srcFolder}/files/**/*.*`,
  },
  watch: {
    html: `${srcFolder}/**/*.html`,
    scss: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/**/*.js`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp,avif}`,
    fonts: {
      all: `${srcFolder}/fonts/*.{ttf,otf,woff,woff2}`,
      otf: `${srcFolder}/fonts/*.otf`,
      ttf: `${srcFolder}/fonts/*.ttf`,
      woff: `${srcFolder}/fonts/dist/*.{woff,woff2}`,
      folder: `${srcFolder}/fonts/`,
      buffer: `${srcFolder}/fonts/dist/`,
      woffTransfer: `${srcFolder}/fonts/dist/*.{woff,woff2}`,
    },
    files: `${srcFolder}/files/**/*.*`,
  },
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: '',
}
