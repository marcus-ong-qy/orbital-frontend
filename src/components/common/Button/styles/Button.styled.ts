import styled from 'styled-components'
import { Button } from 'antd'

export const StyledButton = styled(Button)<{ color?: 'secondary' | 'primary' | 'danger' }>`
  height: 35px;
  width: 100%;
  border-radius: 35px;

  cursor: pointer;
  white-space: nowrap;

  background: ${(props) => {
    if (props.color === 'primary') return props.theme.palette.primary
    if (props.color === 'danger') return props.theme.palette.danger
    return props.theme.palette.secondary
  }};
  font-weight: bold;
  font-size: min(18px, 2vw);

  span {
    color: ${(props) => props.theme.palette.text.white};
  }

  :hover {
    background: ${(props) => !props.disabled && props.theme.palette.highlight.dark};
  }
`
