import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import Button from './Button';

storiesOf('Button', module).add('default', () => (
  <Button onClick={action('clicked')} />
));
