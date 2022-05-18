import styled from 'styled-components';
import { Input } from 'antd';

export const InputFieldContainer = styled.div`
  width: 100%;
  margin-bottom: 1vh;
`;

export const StyledInput = styled(Input)`
  height: 35px;
  width: 100%;
`;

export const StyledPasswordInput = styled(Input.Password)`
  height: 35px;
  width: 100%;
  margin-bottom: 4vh;

  display: grid;
  grid-template-columns 9fr 1fr;


  .ant-input {
    height: 35px; 
    /* width: 80%; */
  }
  .ant-input-suffix {
    display: flex;
    align-items: center;
  }
  .ant-input-password-icon {
  }
  .anticon {
    margin-left: 3vw;
    /* width: 10%; */
  }
`;
