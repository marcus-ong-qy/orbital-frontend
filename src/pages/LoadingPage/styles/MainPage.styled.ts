import styled from 'styled-components';
import { fontTypeCss } from '../../../styles/index.styled';
import { FontType } from '../../../styles/Theme';

export const StyledLoadingPage = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledLoadingDiv = styled.div`
  width: 447px;
  height: 259px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoadingText = styled.div`
  font-weight: 700;
  font-size: 48px;
`;

export const Horse = styled.img`
  width: 194px;
  height: 194px;
  margin-top: 15px;
`;
