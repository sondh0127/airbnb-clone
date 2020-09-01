import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link).attrs(({ color }) => ({
  color: color || 'primary',
  primary: {
    color: '#008489',
  },
  secondary: {
    color: '#fff',
  },
}))`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: ${(props) => props[props.color].color};
  }

  &:active {
    color: inherit;
  }
`;

export default StyledLink;
