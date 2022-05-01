import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/PATHS";
import {
  ForgetPasswordForm,
  StyledButton,
  StyledForgetPasswordPage,
  StyledInput,
} from "./styles/MainPage.styled";

const ForgetPasswordPage = () => {
  const navigate = useNavigate();

  return (
    <StyledForgetPasswordPage>
      <ForgetPasswordForm>
        <h1>Forget Password</h1>
        <StyledInput placeholder="Email" />
        <StyledButton onClick={() => navigate(PATHS.LOGIN)}>
          Reset Password
        </StyledButton>
      </ForgetPasswordForm>
    </StyledForgetPasswordPage>
  );
};

export default ForgetPasswordPage;
