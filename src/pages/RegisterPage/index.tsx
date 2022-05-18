import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import { PATHS } from '../../routes/PATHS';
import {
  FullNameSpan,
  RegisterDiv,
  RegisterDivTitle,
  StyledRegisterPage,
  // RegisterForm,
} from './styles/RegisterPage.styled';

const RegisterPage = () => {
  const navigate = useNavigate();
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
                leftLabel="Left Label"
                leftIsError={true}
              />
              <InputField
                placeholder="Last Name"
                leftLabel="Left Label"
                leftIsError={true}
              />
            </FullNameSpan>
            <InputField
              placeholder="Email"
              leftLabel="Left Label"
              leftIsError={true}
            />
            <InputField
              placeholder="Preferred Username"
              leftLabel="Left Label"
              rightLabel="Right Label"
              leftIsError={true}
              rightIsError={1}
            />
            <InputField
              placeholder="Password (min. 8 chars)"
              leftLabel="Left Label"
              leftIsError={true}
            />
            <Button label="Next" onClick={() => setPageNumber(2)} />
          </>
        )}
        {pageNumber === 2 && (
          <>
            <InputField
              placeholder="Mobile No. (+65)"
              leftLabel="Left Label"
              leftIsError={true}
            />
            <InputField
              placeholder="Address"
              leftLabel="Left Label"
              leftIsError={true}
            />
            <InputField
              placeholder="Postal Code"
              leftLabel="Left Label"
              leftIsError={true}
            />
            <Button label="Sign Up" onClick={() => setPageNumber(1)} />
          </>
        )}
      </RegisterDiv>
    </StyledRegisterPage>
  );
};

export default RegisterPage;
