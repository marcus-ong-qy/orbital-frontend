import styled from 'styled-components';
import { Input } from 'antd';
import { FontType } from '../../../styles/Theme';
import { fontTypeCss } from '../../../styles/index.styled';

export const InputFieldContainer = styled.div`
  margin: 1.2vh;
`;

export const StyledInput = styled.input`
  height: 35px;
  width: 100%;
  padding-left: 12px;

  border-radius: 35px;
`;

export const PasswordSpan = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const StyledBigA = styled.div`
  height: 35px;
  width: 10%;

  line-height: 35px;

  font-size: 22px;
  font-weight: 600;
  text-decoration: underline;
  text-align: center;

  cursor: default;
`;

export const StyledPasswordInput = styled(Input.Password)`
  height: 35px;
  width: 100%;

  display: grid;
  grid-template-columns 9fr 1fr;

  .ant-input {
    height: 35px; 
    border-radius: 35px;
    padding-left: 12px;
  }
  .ant-input-suffix {
    display: flex;
    align-items: center;
  }
  .anticon {
    margin-left: 3vw;
  }
`;

export const AlwaysLoggedInSpan = styled.span<{ fontType: FontType }>`
  ${fontTypeCss}
  font-weight: 700;
`;

export const PasswordLowerSpan = styled.span`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5vh;
`;
