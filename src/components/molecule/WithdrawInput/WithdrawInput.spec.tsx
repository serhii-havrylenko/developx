import { mount } from 'enzyme';
import * as React from 'react';

import WithdrawInput from './WithdrawInput';

jest.mock('@material-ui/core/Button');
jest.mock('@material-ui/core/TextField');

describe('<WithdrawInput /> tests', () => {
  const props = {
    onWithdrawClick: jest.fn(),
    amountRef: React.createRef() as React.RefObject<HTMLInputElement>,
  };

  test('should match snapshot', () => {
    const tree = mount(<WithdrawInput {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
