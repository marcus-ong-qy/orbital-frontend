import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../routes/PATHS';
import {
  ForgetPasswordDiv,
  HorseHead,
  // ForgetPasswordForm,
  StyledButton,
  StyledForgetPasswordPage,
  StyledInput,
} from './styles/ForgetPasswordPage.styled';

import horseHeadTransparent from '../../assets/Horse-head-transparent.png';

const ForgetPasswordPage = () => {
  const navigate = useNavigate();

  return (
    <StyledForgetPasswordPage>
      <ForgetPasswordDiv>
        <h1>Forget Password</h1>
        <HorseHead src={horseHeadTransparent} />
        An email will be sent for you to reset your password
        <StyledInput placeholder="Email Address" />
        <StyledButton onClick={() => 'navigate(PATHS.LOGIN)'}>
          Reset Password
        </StyledButton>
      </ForgetPasswordDiv>
      {/* <ForgetPasswordForm>
        <h1>Forget Password</h1>
        <StyledInput placeholder="Email" />
        <StyledButton onClick={() => navigate(PATHS.LOGIN)}>
          Reset Password
        </StyledButton>
      </ForgetPasswordForm> */}
    </StyledForgetPasswordPage>
  );
};

export default ForgetPasswordPage;
