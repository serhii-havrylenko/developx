import express from 'express';
import helmet from 'helmet';
import { get } from 'lodash';
import * as path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleWare from 'webpack-hot-middleware';

import config from '../../webpack.config.babel';
import cors from './cors';
import router from './router';

const app = express();

app.use(cors);
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  const [webapckConfig] = config();
  const compiler = webpack(webapckConfig as object);
  app.use(
    webpackDevMiddleware(compiler, {
      // noInfo: true,
      publicPath: get(webapckConfig, 'output.publicPath', '/public'),
      stats: {
        assets: false,
        chunkModules: false,
        chunks: false,
        colors: true,
        hash: false,
        timings: false,
        version: false,
      },
    }),
  );
  app.use(webpackHotMiddleWare(compiler));
}

app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.get('*', router);

export default app;
