/**
 * Routes.tsx
 * define application routing
 */
import Application from '#components/App';
import * as Pages from '#components/loader';
import { Location } from 'history';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

interface StateMap {
  router: { location?: Location };
}

const switchMapState = ({ router: { location } }: StateMap) => ({ location });

const ConnectedSwitch = connect(
  switchMapState,
  null,
)((props) => <Switch {...props} />);

/**
 * Application component with router and pages
 */
const Routes: React.SFC = () => (
  <ThemeProvider theme={{}}>
    <Application>
      <ConnectedSwitch>
        <Route exact={true} path="/" component={Pages.HomePage} />
        <Route path="/home" component={Pages.HomePage} />
        <Route path="/sample" component={Pages.SamplePage} />
        <Route path="*" component={Pages.NotFoundPage} />
      </ConnectedSwitch>
    </Application>
  </ThemeProvider>
);

export default hot(module)(Routes);
