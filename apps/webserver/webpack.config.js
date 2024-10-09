const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const glob = require("glob")
const path = require("path")

const migrations = glob
    .sync(path.resolve("src/database/*.ts"))
  .reduce((entries, filename) => {
    const migrationName = path.basename(filename, ".ts")
    entries[migrationName] = filename;
    return entries
  }, {})
const config = glob
    .sync(path.resolve("src/datasources/*.ts"))
        .reduce((entries, filename) => {
            const migrationName = path.basename(filename, ".ts")
            return Object.assign({}, entries, {
                [migrationName]: filename,
            })
        }, {})

module.exports = {
  entry: {
    main: './src/main.ts',
    'orm-config': config['orm-config'],
    ...migrations
  },
  output: {
    path: join(__dirname, '../../dist/apps/webserver'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          configFile: join(__dirname, './tsconfig.app.json'),
        },
      },
    ],
  },
  target: 'node',
  externals: {
    typeorm: 'commonjs typeorm',
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
    }),
  ],
};
