import {
  Horse,
  LoadingText,
  StyledLoadingDiv,
  StyledLoadingPage,
} from './styles/MainPage.styled';

import HorseLogo from '../../assets/Horse-head-transparent.png';

const LoadingPage = () => {
  return (
    <StyledLoadingPage>
      <StyledLoadingDiv>
        <LoadingText>Loading...</LoadingText>
        <Horse src={HorseLogo} />
      </StyledLoadingDiv>
    </StyledLoadingPage>
  );
};

export default LoadingPage;
