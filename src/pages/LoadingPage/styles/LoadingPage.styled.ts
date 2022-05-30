import styled, { keyframes } from 'styled-components'
import { styledPageCss } from '../../../styles/index.styled'

export const StyledLoadingPage = styled.div`
  ${styledPageCss}
`

export const StyledLoadingDiv = styled.div`
  width: 447px;
  height: 259px;
  margin-top: 15vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const LoadingText = styled.div`
  font-weight: 700;
  font-size: 48px;
`

const gallopAnimation = keyframes`
  0% {
    transform: rotate(0) translateX(0) translateY(0);
  }
  25% {
    transform: rotate(-10deg) translateX(-20px) translateY(10px) ;
  }
  50% {
    transform: rotate(0) translateX(0) translateY(0);
  }
  75% {
    transform: rotate(25deg) translateX(20px) translateY(-10px);
  }
  100% {
    transform: rotate(0) translateX(0) translateY(0);
  }
`

export const GallopingHorse = styled.img`
  width: 194px;
  height: 194px;
  margin-top: 15px;
  animation-name: ${gallopAnimation};
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
`
