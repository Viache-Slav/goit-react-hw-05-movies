import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 3px 0 0 15px;
  text-decoration: none;

  .trending-header {
    color: green;
  }
`;