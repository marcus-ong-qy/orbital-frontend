import { GallopingHorse, LoadingText, StyledLoadingDiv } from './styles/LoadingSpin.styled'

import HorseLogo from '../../../assets/Horse-head-transparent.png'

const LoadingPage = () => {
  return (
    <StyledLoadingDiv>
      <LoadingText>Loading...</LoadingText>
      <GallopingHorse src={HorseLogo} />
    </StyledLoadingDiv>
  )
}

export default LoadingPage
