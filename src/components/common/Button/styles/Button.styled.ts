import styled from 'styled-components'
import { Button } from 'antd'

export const StyledButton = styled(Button)`
  height: 35px;
  width: 100%;
  border-radius: 35px;

  cursor: pointer;
  white-space: nowrap;

  background: ${(props) => props.theme.palette.secondary};
  font-weight: bold;
  font-size: min(18px, 2vw);

  span {
    color: ${(props) => props.theme.palette.text.white};
  }

  :hover {
    background: ${(props) => props.theme.palette.highlight.dark};
  }
`
