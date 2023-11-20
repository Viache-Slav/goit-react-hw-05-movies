import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledLink = styled(NavLink)`
  text-decoration: none;
  &.active {
    color: green;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 15px;
  padding: 20px;
  border-bottom: 1px solid green;
`;