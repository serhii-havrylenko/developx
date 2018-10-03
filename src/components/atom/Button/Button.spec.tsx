import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';

import Button from './Button';

describe('<Button /> tests', () => {
  test('mount properly', () => {
    const tree = mount(<Button onClick={undefined} />);
    expect(tree).toBeDefined();
    expect(toJson(tree)).toMatchSnapshot();
  });
});
