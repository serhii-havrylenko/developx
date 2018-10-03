import createMemoryHistory from 'history/createMemoryHistory';
import fetch from 'isomorphic-fetch';
import * as React from 'react';
import Helmet from 'react-helmet';
import JssProvider from 'react-jss/lib/JssProvider';

import {
  createGenerateClassName,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { Request, Response } from 'express';
import { History } from 'history';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { renderToNodeStream } from 'react-dom/server';
import { SheetsRegistry } from 'react-jss/lib/jss';
import { Provider } from 'react-redux';
// import { ConnectedRouter, push } from 'react-router-redux';
import { push } from 'react-router-redux';
import { Store } from 'redux';
import { ServerStyleSheet } from 'styled-components';

import Routes from '#components/Routes';
import env from '#env';
import configureStore from '#store';
import { StaticRouter } from 'react-router';

const stringify = (field: string, obj: object) =>
  `window.${field}=${JSON.stringify(obj).replace(/</g, '\\u003c')};`;

interface IRenderAppArgs {
  client: ApolloClient<{}>;
  history: History;
  sheet: ServerStyleSheet;
  sheetsRegistry: SheetsRegistry;
  store: Store<{}>;
}

const renderApp = async ({
  sheet,
  store,
  // history,
  client,
  sheetsRegistry,
}: IRenderAppArgs): Promise<
  React.ReactElement<{ sheet: ServerStyleSheet }>
> => {
  const generateClassName = createGenerateClassName();
  const theme = createMuiTheme({});

  const app = sheet.collectStyles(
    <div id="react-root">
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          <Provider store={store}>
            <ApolloProvider client={client}>
              {/* <ConnectedRouter history={history}> */}
              <StaticRouter>
                <Routes />
                {/* </ConnectedRouter> */}
              </StaticRouter>
            </ApolloProvider>
          </Provider>
        </MuiThemeProvider>
      </JssProvider>
    </div>,
  );

  console.log(app);
  await getDataFromTree(app);

  return app;
};

export default async (req: Request, res: Response) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({ fetch, uri: env.apolloServerUrl }),
    ssrMode: true,
  });

  const sheet = new ServerStyleSheet();
  const sheetsRegistry = new SheetsRegistry();
  const history = createMemoryHistory();
  const store = configureStore({}, history);
  store.dispatch(push(req.originalUrl));

  res.contentType('text/html');
  try {
    const app = await renderApp({
      client,
      history,
      sheet,
      sheetsRegistry,
      store,
    });
    const helmet = Helmet.renderStatic();

    res.write(`
     <html lang="en" ${helmet.htmlAttributes}>
       <head>
         ${helmet.title}
         ${helmet.meta}
       </head>
       <body ${helmet.bodyAttributes}>
   `);

    const stream = sheet.interleaveWithNodeStream(renderToNodeStream(app));
    stream.pipe(
      res,
      { end: false },
    );
    stream.on('end', () =>
      res.end(`
         <style id="jss-server-side">${sheetsRegistry}</style>

         <script>${stringify('__APOLLO_STATE__', client.extract())}</script>
         <script>${stringify('__INITIAL_STATE__', store.getState())}</script>
         <script type="application/javascript" src="public/manifest.bundle.js"></script>
         <script type="application/javascript" src="public/vendor.bundle.js"></script>
         <script type="application/javascript" src="public/client.bundle.js"></script>
       </body>
     </html>
   `),
    );
  } catch (e) {
    res.status(500).end(`Something went wrong. Sorry!<br />${e.message}`);
  }
};
