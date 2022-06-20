import styled, { css } from 'styled-components'
import { borderedGreyDivCss, fontTypeCss } from '../../../../styles/index.styled'
import { FontType, theme } from '../../../../styles/Theme'

export const DropdownText = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
`

export const SearchbarWrapper = styled.div`
  width: 100%;
  height: auto;
`

export const StyledSearchbarDropdown = styled.div`
  ${borderedGreyDivCss}
  width: 100%;
  height: auto;

  cursor: pointer;
`

export const DropdownOptionDiv = styled.div``

const SearchbarDropdownCss = css`
  .ant-select-dropdown {
    ${borderedGreyDivCss}

    border-radius: 3px;

    z-index: 999;
  }

  .rc-virtual-list {
    height: 24px;
    line-height: 24px;
    padding-left: 12px;

    cursor: pointer;

    :hover {
      background: ${theme.palette.common.gray.light};
    }
  }

  .rc-virtual-list-holder {
  }
`

export default SearchbarDropdownCss
