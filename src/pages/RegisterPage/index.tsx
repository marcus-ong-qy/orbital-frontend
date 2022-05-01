import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/PATHS";
import {
  StyledRegisterPage,
  RegisterForm,
  StyledInput,
  StyledButton,
} from "./styles/MainPage.styled";

const RegisterPage = () => {
  const navigate = useNavigate();
  return (
    <StyledRegisterPage>
      <RegisterForm>
        <h1>Register</h1>
        <StyledInput placeholder="Email" />
        <StyledInput placeholder="Username" />
        <StyledInput placeholder="User ID (7-digit Matriculation Number (Axxxxxx))" />
        <StyledInput placeholder="Password (min. 8 characters)" />
        <StyledInput placeholder="Confirm Password" />
        <StyledButton onClick={() => navigate(PATHS.LOGIN)}>
          Register
        </StyledButton>
      </RegisterForm>
    </StyledRegisterPage>
  );
};

export default RegisterPage;
