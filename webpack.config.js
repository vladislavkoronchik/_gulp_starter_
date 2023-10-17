import "@babel/polyfill";
import path from 'path';
const __dirname = path.resolve();

export const webpackConfig = (isDevMode) => {
  return {
    entry: [
      "@babel/polyfill",
      path.join(path.resolve(__dirname), 'src/js/app.js')
    ],
    mode: isDevMode ? 'development' : 'production',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'script.min.js',
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
  }
}
