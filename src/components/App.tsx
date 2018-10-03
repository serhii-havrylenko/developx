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
import Menu from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import withStyle from '#components/App.sc';
import withCleanup from '#hoc/withCleanup';

// const query = gql`
//   query Query {
//     hello
//   }
// `;

interface IAppProps {
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

const HeaderNavWrapper = styled.div`
  display: flex;
  flex: 1;

  & > a {
    color: #fff;
    text-decoration: none;
  }

  & > *:not(:first-child) {
    margin-left: 10px;
  }
`;

/**
 * Application viewport component
 */
const App: React.SFC<IAppProps> = ({ children, className, classes }) => (
  <div className={className}>
    <Helmet>
      <title>DevelopX sample</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
    <AppBar position="static" className={classes.toolbar}>
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu">
          <Menu />
        </IconButton>
        <Typography
          variant="title"
          color="inherit"
          className={classes.toolbarTitle}
        >
          DevelopX
        </Typography>
        <HeaderNavWrapper>
          <NavLink to="/home" activeClassName={classes.activeNavLink}>
            <Typography variant="title" color="inherit" noWrap={false}>
              Home
            </Typography>
          </NavLink>
          <NavLink to="/sample">
            <Typography
              variant="title"
              noWrap={false}
              color="inherit"
              className={classes.navLink}
            >
              FAQ
            </Typography>
          </NavLink>
        </HeaderNavWrapper>
      </Toolbar>
    </AppBar>
    <main className={classes.layout}>{children}</main>
    <footer>© chef</footer>
  </div>
);

// const withGql = graphql(query);
export default compose<IAppProps, Partial<IAppProps>>(
  withCleanup,
  // withGql,
  withStyle,
  withStyles(styles),
)(App);
