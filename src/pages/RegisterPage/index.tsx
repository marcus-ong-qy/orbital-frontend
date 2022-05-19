import { useState } from 'react';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputFields/InputField';
import PasswordInputField from '../../components/InputFields/PasswordInputField';
import {
  FullNameSpan,
  RegisterDiv,
  RegisterDivTitle,
  StyledRegisterPage,
} from './styles/RegisterPage.styled';

const RegisterPage = () => {
  // const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState<1 | 2>(1);

  return (
    <StyledRegisterPage>
      <RegisterDiv>
        <RegisterDivTitle>Sign Up</RegisterDivTitle>
        <h2>Page {pageNumber}</h2>
        {pageNumber === 1 && (
          <>
            <FullNameSpan>
              <InputField
                placeholder="First Name"
                errorLabel="Label"
                isError={true}
              />
              <InputField
                placeholder="Last Name"
                errorLabel="Label"
                isError={true}
              />
            </FullNameSpan>
            <InputField placeholder="Email" errorLabel="Label" isError={true} />
            <InputField
              placeholder="Preferred Username"
              errorLabel="Label"
              isError={true}
            />
            <PasswordInputField
              type="signup"
              placeholder="Password (min. 8 chars)"
              errorLabel="Label"
              isError={true}
            />
            <Button label="Next" onClick={() => setPageNumber(2)} />
          </>
        )}
        {pageNumber === 2 && (
          <>
            <InputField
              placeholder="Mobile No. (+65)"
              errorLabel="Label"
              isError={true}
            />
            <InputField
              placeholder="Address"
              errorLabel="Label"
              isError={true}
            />
            <InputField
              placeholder="Postal Code"
              errorLabel="Label"
              isError={true}
            />
            <Button label="Sign Up" onClick={() => setPageNumber(1)} />
          </>
        )}
      </RegisterDiv>
    </StyledRegisterPage>
  );
};

export default RegisterPage;
