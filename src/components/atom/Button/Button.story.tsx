// @flow
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import Button from '#atom/Button';

const stories = storiesOf('StepItem', module);

stories.add('simple btn', () => <Button onClick={action('clicked')} />);
