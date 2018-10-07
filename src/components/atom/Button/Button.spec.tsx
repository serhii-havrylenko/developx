import { shallow } from 'enzyme';
import * as React from 'react';

import Button from './Button';

describe('<Button /> tests', () => {
  test('should match snapshot', () => {
    const tree = shallow(<Button onClick={undefined} />);
    expect(tree.dive()).toMatchSnapshot();
  });
});
