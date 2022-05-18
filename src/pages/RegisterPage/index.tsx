import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../routes/PATHS';
import {
  RegisterDiv,
  StyledRegisterPage,
  // RegisterForm,
  // StyledInput,
  // StyledButton,
} from './styles/RegisterPage.styled';

const RegisterPage1 = () => {
  return <RegisterDiv>RegisterPage1</RegisterDiv>;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  return (
    <StyledRegisterPage>
      <RegisterPage1 />
      {/* TODO make an InputField Component */}
      {/* <RegisterForm>
        <h1>Register</h1>
        <StyledInput placeholder="Email" />
        <StyledInput placeholder="Username" />
        <StyledInput placeholder="User ID (7-digit Matriculation Number (Axxxxxx))" />
        <StyledInput placeholder="Password (min. 8 characters)" />
        <StyledInput placeholder="Confirm Password" />
        <StyledButton onClick={() => navigate(PATHS.LOGIN)}>
          Register
        </StyledButton>
      </RegisterForm> */}
    </StyledRegisterPage>
  );
};

export default RegisterPage;
