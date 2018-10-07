/**
 * Provides root component for '/faq' page
 * @module #pages/Sample
 */
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import * as React from 'react';

/**
 * Root component for '/faq' page
 */
const FAQ: React.SFC = () => (
  <div>
    <Typography variant="display2">FAQ</Typography>
    <Typography variant="display1">Used Tools and Libraries</Typography>
    <List component="nav">
      <ListItem>
        <ListItemText primary="react" />
      </ListItem>
      <ListItem>
        <ListItemText primary="react-apollo" />
      </ListItem>
      <ListItem>
        <ListItemText primary="react-redux" />
      </ListItem>
      <ListItem>
        <ListItemText primary="styled-components" />
      </ListItem>
      <ListItem>
        <ListItemText primary="@material-ui" />
      </ListItem>
    </List>
    <Divider />
    <List component="nav">
      <ListItem>
        <ListItemText primary="express" />
      </ListItem>
      <ListItem>
        <ListItemText primary="graphql" />
      </ListItem>
    </List>
    <Divider />
    <List component="nav">
      <ListItem>
        <ListItemText primary="typescript" />
      </ListItem>
      <ListItem>
        <ListItemText primary="@babel" />
      </ListItem>
      <ListItem>
        <ListItemText primary="jest" />
      </ListItem>
      <ListItem>
        <ListItemText primary="webpack" />
      </ListItem>
      <ListItem>
        <ListItemText primary="tslint" />
      </ListItem>
      <ListItem>
        <ListItemText primary="prettier" />
      </ListItem>
    </List>
  </div>
);

export default FAQ;
