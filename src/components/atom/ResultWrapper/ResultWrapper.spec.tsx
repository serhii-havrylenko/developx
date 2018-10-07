import { shallow } from 'enzyme';
import * as React from 'react';

import ResultWrapper from './ResultWrapper';

describe('<ResultWrapper /> tests', () => {
  test('should match snapshot', () => {
    const tree = shallow(<ResultWrapper />);
    expect(tree).toMatchSnapshot();
  });
});
