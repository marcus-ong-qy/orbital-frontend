import styled from 'styled-components';
import { fontTypeCss } from '../../../styles/index.styled';
import { FontType } from '../../../styles/Theme';

export const StyledLabel = styled.span<{
  fontType: FontType;
  float: 'left' | 'right';
}>`
  float: ${(props) => props.float};
  margin: 0 0.5rem 0;
  color: ${(props) => props.theme.palette.danger};

  ${fontTypeCss}
  font-weight: 600;
`;

export const LabelsSpan = styled.span``; // TODO check if redundant
