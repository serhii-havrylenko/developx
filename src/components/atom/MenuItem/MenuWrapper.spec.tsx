import { mount } from 'enzyme';
import * as React from 'react';

import MenuItem from './MenuItem';

jest.mock('@material-ui/core/Typography');

describe('<MenuItem /> tests', () => {
  test('should match snapshot', () => {
    const tree = mount(<MenuItem />);
    expect(tree).toMatchSnapshot();
  });
});
