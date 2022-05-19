import styled from 'styled-components';
import { Button } from 'antd';

export const StyledButton = styled(Button)`
  height: 35px;
  width: 100%;
  background: ${(props) => props.theme.palette.secondary};
  color: ${(props) => props.theme.palette.common.gray};
  font-weight: bold;
  font-size: 18px;
`;
