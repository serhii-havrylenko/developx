import path from 'path';
import {
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
  EnvironmentPlugin,
  optimize,
} from 'webpack';
import { CheckerPlugin } from 'awesome-typescript-loader';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import UglifyPlugin from 'uglifyjs-webpack-plugin';
import NodeExt from 'webpack-node-externals';
import resolver from './webpack.config.resolve';

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

export default () => [
  {
    ...resolver,
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    context: SRC_DIR,
    target: 'web',
    devtool:
      process.env.NODE_ENV !== 'production'
        ? 'cheap-module-eval-source-map'
        : false,
    entry: {
      client: [
        ...(process.env.NODE_ENV !== 'production' && [
          'webpack-hot-middleware/client?reload=true',
        ]),
        `${SRC_DIR}/index.tsx`,
      ],
    },
    output: {
      path: `${DIST_DIR}/public`,
      filename: '[name].bundle.js',
      publicPath: '/public',
    },
    module: {
      rules: [
        {
          test: /.tsx?$/,
          // loaders: ['react-hot-loader/babel', 'awesome-typescript-loader'],
          exclude: path.resolve(__dirname, 'node_modules'),
          include: path.resolve(__dirname, 'src'),
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: true,
                plugins: ['react-hot-loader/babel'],
              },
            },
            'awesome-typescript-loader',
          ],
        },
      ],
    },
    optimization: {
      runtimeChunk: {
        name: 'manifest',
      },
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    plugins: [
      new EnvironmentPlugin({
        NODE_ENV: 'development',
        BABEL_ENV: 'client',
      }),
      new CheckerPlugin(),
      ...(process.env.NODE_ENV === 'development' && [
        new HotModuleReplacementPlugin(),
      ]),
      new NoEmitOnErrorsPlugin(),
      // ...(process.env.NODE_ENV === 'analyze' && [new BundleAnalyzerPlugin()])
    ],
  },
  // ...(process.env.NODE_ENV === 'production' && [
  //   {
  //     ...resolver,
  //     entry: {
  //       server: `${SRC_DIR}/server/index.ts`,
  //     },
  //     output: {
  //       path: DIST_DIR,
  //       filename: '[name].js',
  //     },
  //     target: 'node',
  //     node: {
  //       __filename: false,
  //       __dirname: false,
  //     },
  //     externals: [NodeExt()],
  //     module: {
  //       rules: [
  //         {
  //           test: /.js$/,
  //           loaders: ['babel-loader'],
  //           exclude: path.resolve(__dirname, 'node_modules'),
  //         },
  //         {
  //           test: /.tsx?$/,
  //           loaders: ['awesome-typescript-loader'],
  //           exclude: path.resolve(__dirname, 'node_modules'),
  //           include: path.resolve(__dirname, 'src'),
  //         },
  //       ],
  //     },
  //     plugins: [
  //       // new EnvironmentPlugin({
  //       //   BABEL_ENV: 'server',
  //       // }),
  //       // new CheckerPlugin(),
  //       // new NoEmitOnErrorsPlugin(),
  //       // new UglifyPlugin(),
  //     ],
  //   },
  // ]),
];
