import styled from 'styled-components';
import { Button } from 'antd';

export const StyledButton = styled(Button)`
  height: 35px;
  width: 100%;
  background: ${(props) => props.theme.palette.secondary};
  color: black;
  font-weight: bold;
`;
