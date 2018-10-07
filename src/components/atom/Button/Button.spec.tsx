import { mount } from 'enzyme';
import * as React from 'react';

import Button from './Button';

jest.mock('@material-ui/core/Button');

describe('<Button /> tests', () => {
  test('should match snapshot', () => {
    const tree = mount(<Button onClick={undefined} />);
    expect(tree).toMatchSnapshot();
  });
});
