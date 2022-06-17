import styled from 'styled-components'
import { Button } from 'antd'
import { fontTypeCss } from '../../../../styles/index.styled'
import { FontType } from '../../../../styles/Theme'

export const StyledButton = styled(Button)`
  height: 35px;
  width: 100%;
  border-radius: 35px;

  cursor: pointer;

  background: ${(props) => props.theme.palette.secondary};
  font-weight: bold;
  font-size: 18px;

  span {
    color: ${(props) => props.theme.palette.common.white};
  }

  :hover {
    background: ${(props) => props.theme.palette.highlight.dark};
  }
`
