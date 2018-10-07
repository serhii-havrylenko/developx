import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { StaticRouter } from 'react-router';
import styled from 'styled-components';

import MenuList from './MenuList';

const items = [{ title: 'Home', to: '/home' }, { title: 'FAQ', to: '/faq' }];
const Wrapper = styled.div`
  width: 100%;
  height: 70px;
  background-color: #abcdef;
`;

storiesOf('MenuList', module)
  .addDecorator((story) => (
    <StaticRouter>
      <Wrapper>{story()}</Wrapper>
    </StaticRouter>
  ))
  .add('default', () => <MenuList items={items} />);
