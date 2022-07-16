import styled, { FontType } from 'styled-components'
import { borderedGreyDivCss, fontTypeCss } from '../../../../styles/index.styled'

export const SearchbarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`

export const StyledSearchbarDropdown = styled.div`
  ${borderedGreyDivCss}
  position: absolute;
  width: 100%;
  height: auto;

  cursor: pointer;
`

export const DropdownOptionDiv = styled.div<{ fontType: FontType; disabled?: boolean }>`
  ${fontTypeCss}
  padding: 0.2rem 0.8rem;
  font-style: ${(props) => props.disabled && 'italic'};
  font-weight: 400;

  border-bottom: 0.5px solid ${(props) => props.theme.palette.common.gray.dark};

  cursor: ${(props) => props.disabled && 'default'};
`
