import { shallow } from 'enzyme';
import * as React from 'react';

import ChipsWrapper from './ChipsWrapper';

describe('<ChipsWrapper /> tests', () => {
  test('should match snapshot', () => {
    const tree = shallow(<ChipsWrapper />);
    expect(tree).toMatchSnapshot();
  });
});
