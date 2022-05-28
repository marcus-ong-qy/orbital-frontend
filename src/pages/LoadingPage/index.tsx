import {
  GallopingHorse,
  LoadingText,
  StyledLoadingDiv,
  StyledLoadingPage,
} from './styles/LoadingPage.styled'

import HorseLogo from '../../assets/Horse-head-transparent.png'

const LoadingPage = () => {
  return (
    <StyledLoadingPage>
      <StyledLoadingDiv>
        <LoadingText>Loading...</LoadingText>
        <GallopingHorse src={HorseLogo} />
      </StyledLoadingDiv>
    </StyledLoadingPage>
  )
}

export default LoadingPage
