import { mount } from 'enzyme';
import * as React from 'react';

import MenuList from './MenuList';

jest.mock('@material-ui/core/Typography');
jest.mock('react-router-dom', () => {
  require('react');
  return {
    NavLink: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

describe('<MenuList /> tests', () => {
  const props = {
    items: [{ title: 'Home', to: '/home' }, { title: 'FAQ', to: '/faq' }],
  };

  test('should match snapshot', () => {
    const tree = mount(<MenuList {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
