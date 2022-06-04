import styled from 'styled-components'
import { Button } from 'antd'

export const StyledButton = styled(Button)`
  height: 35px;
  width: 100%;
  border-radius: 35px;

  cursor: pointer;

  background: ${(props) => props.theme.palette.secondary};
  color: ${(props) => props.theme.palette.common.black};
  font-weight: bold;
  font-size: 18px;

  :hover {
    background: ${(props) => props.theme.palette.highlight.dark};
  }
`
