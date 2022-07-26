import styled from 'styled-components'
import { Switch } from 'antd'

export const StyledDarkModeToggleSwitch = styled(Switch)`
  height: 36px;
  width: min(6vw, 80px);

  font-size: 22px;
  line-height: 22px;
  border-radius: 10px;
  background: ${(props) => props.theme.palette.common.gray.light};

  :hover {
    background: ${(props) => props.theme.palette.common.gray.dark};
  }
`
