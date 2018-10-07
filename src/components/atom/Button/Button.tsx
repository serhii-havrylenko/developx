/**
 * Provides basic button
 * @module #atom/Button
 */
import Btn from '@material-ui/core/Button';
import * as React from 'react';

export interface Button {
  onClick?: () => void;
}

/**
 * Provides basic button component
 */
const Button: React.SFC<Button> = ({ children, onClick }) => (
  <Btn color="primary" onClick={onClick}>
    {children || 'sample'}
  </Btn>
);

export default Button;
