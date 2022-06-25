import styled, { css } from 'styled-components'
import { borderedGreyDivCss, fontTypeCss } from '../../../../styles/index.styled'
import { FontType, theme } from '../../../../styles/Theme'

// export const DropdownText = styled.div<{ fontType: FontType }>`
//   ${fontTypeCss}
// `

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
  color: ${(props) => props.disabled && props.theme.palette.common.gray.dark};
`

// const SearchbarDropdownCss = css`
//   .ant-select-dropdown {
//     ${borderedGreyDivCss}

//     border-radius: 3px;

//     z-index: 999;
//   }

//   .rc-virtual-list {
//     height: 24px;
//     line-height: 24px;
//     padding-left: 12px;

//     cursor: pointer;

//     :hover {
//       background: ${theme.palette.common.gray.light};
//     }
//   }

//   .rc-virtual-list-holder {
//   }
// `

// export default SearchbarDropdownCss
