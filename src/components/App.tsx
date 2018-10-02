/**
 * App.tsx
 * define application viewport component
 * @children {React.Node} - any page to display
 */
import { default as gql } from 'graphql-tag';
import { get } from 'lodash';
import React from 'react';
import { graphql } from 'react-apollo';
import Helmet from 'react-helmet';
import { compose } from 'recompose';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/icons/Menu';

import Button from '#atom/Button';
import withStyle from '#components/App.sc';
import withCleanup from '#hoc/withCleanup';

const query = gql`
  query Query {
    hello
  }
`;

interface IAppProps {
  className?: string;
  data: { hello: string };
}

// tslint:disable-next-line: no-console
const stub = (id: number) => () => console.log('work', id);

/**
 * Application viewport component
 */
const App: React.SFC<IAppProps> = ({ children, className, data }) => (
  <div className={className}>
    <Helmet>
      <title>Isomorfic react app sample</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu">
          <Menu />
        </IconButton>
        <Typography type="title" color="inherit" style={{ flex: 1 }}>
          App title says and: {get(data, 'hello', 'no data')}
        </Typography>
      </Toolbar>
    </AppBar>
    <section>
      <div>pages content here</div>
      {children}
    </section>
    <section>
      And footer with change
      <Button onClick={stub(1)}>Footer Button #1</Button>
      <Button onClick={stub(2)}>Footer Button #2</Button>
    </section>
  </div>
);

const withGql = graphql(query);
export default compose(
  withCleanup,
  withGql,
  withStyle,
)(App);
