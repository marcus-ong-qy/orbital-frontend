import styled from 'styled-components';
import { FontType } from '../../../styles/Theme';
import { fontTypeCss } from '../../../styles/index.styled';

export const StyledNavLink = styled.span`
  cursor: pointer;
`;

export const NavLinks = styled.span<{ fontType: FontType; justify?: string }>`
  ${fontTypeCss}
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.justify ?? 'left'};
  padding-left: ${(props) => (props.justify !== 'center' ? '13px' : '')};

  color: ${(props) => props.theme.palette.common.white};
  cursor: default;
`;
