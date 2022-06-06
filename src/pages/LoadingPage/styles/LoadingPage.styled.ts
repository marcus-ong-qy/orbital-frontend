import styled from 'styled-components'
import { gallopAnimation, styledPageCss } from '../../../styles/index.styled'

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

export const GallopingHorse = styled.img`
  width: 194px;
  height: 194px;
  margin-top: 15px;

  animation-name: ${gallopAnimation};
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
`
