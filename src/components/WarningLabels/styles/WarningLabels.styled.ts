import styled from 'styled-components'
import { fontTypeCss } from '../../../styles/index.styled'
import { FontType } from '../../../styles/Theme'

export const StyledLabel = styled.div<{ fontType: FontType }>`
  margin: 0 0.5rem 0;
  color: ${(props) => props.theme.palette.danger};

  ${fontTypeCss}
  font-weight: 600;
`
