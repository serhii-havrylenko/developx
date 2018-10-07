import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import MenuItem from '#atom/MenuItem';

export interface MenuItem {
  title: string;
  to: string;
}

export interface MenuList {
  items: MenuItem[];
}

const Wrapper = styled.div`
  display: flex;
  height: 70px;
  flex: 1;

  & > a {
    color: #fff;
    text-decoration: none;
    align-self: center;
  }

  & > *:not(:first-child) {
    margin-left: 10px;
  }
`;

const MenuList: React.SFC<MenuList> = ({ items }) => (
  <Wrapper>
    {items.map(({ to, title }, id) => (
      <NavLink to={to} key={id}>
        <MenuItem>{title}</MenuItem>
      </NavLink>
    ))}
  </Wrapper>
);

export default MenuList;
