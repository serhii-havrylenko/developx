import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import styled from 'styled-components';

const MenuItem: React.SFC = ({ children }) => (
  <Typography variant="title" color="inherit" noWrap={false}>
    {children}
  </Typography>
);

export default styled(MenuItem)`
  && {
    color: #fff;
  }
`;
