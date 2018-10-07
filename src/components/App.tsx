// import { default as gql } from 'graphql-tag';
import * as React from 'react';
// import { graphql } from 'react-apollo';
import Helmet from 'react-helmet';
import { compose } from 'recompose';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { Theme, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Assignment from '@material-ui/icons/Assignment';

import withStyle from '#components/App.sc';
import withCleanup from '#hoc/withCleanup';
import MenuList from '#molecule/MenuList';

// const query = gql`
//   query Query {
//     hello
//   }
// `;

interface AppProps {
  className?: string;
  classes: { [key: string]: string };
  data: { hello: string };
}

const styles = (theme: Theme) => ({
  toolbar: {
    position: 'relative' as 'relative',
  },
  toolbarTitle: {
    margin: '0 10px',
    width: '150px',
  },
  layout: {
    flex: 1,
    marginLeft: theme.spacing.unit * 3,
    marginTop: '10px',
    marginRight: theme.spacing.unit * 3,
    width: 'auto',
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

const items = [{ title: 'Home', to: '/home' }, { title: 'FAQ', to: '/faq' }];

/**
 * Application viewport component
 */
const App: React.SFC<AppProps> = ({ children, className, classes }) => (
  <div className={className}>
    <Helmet>
      <title>DevelopX sample</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
    <AppBar position="static" className={classes.toolbar}>
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu">
          <Assignment />
        </IconButton>
        <Typography
          variant="title"
          color="inherit"
          className={classes.toolbarTitle}
        >
          DevelopX
        </Typography>
        <MenuList items={items} />
      </Toolbar>
    </AppBar>
    <main className={classes.layout}>{children}</main>
    <footer>© chef</footer>
  </div>
);

// const withGql = graphql(query);
export default compose<AppProps, Partial<AppProps>>(
  withCleanup,
  // withGql,
  withStyle,
  withStyles(styles),
)(App);
