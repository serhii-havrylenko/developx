/**
 * Provides basic button
 * @module #atom/Button
 */
import Btn from '@material-ui/core/Button';
import * as React from 'react';

interface IButton {
  onClick?: () => void;
}

/**
 * Provides basic button component
 */
const Button: React.SFC<IButton> = ({ children, onClick }) => (
  <Btn color="primary" onClick={onClick}>
    {children || 'sample'}
  </Btn>
);

export default Button;
