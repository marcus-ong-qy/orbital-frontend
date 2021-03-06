import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FieldValues, useForm } from 'react-hook-form'
import GoogleButton from 'react-google-button'

import { theme } from '../../styles/Theme'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { PATHS } from '../../routes/PATHS'
import { emailRegex, passwordRegex } from '../../common/regex'
import { SIGNUP, signupErrorLabels } from '../../common/warnings'

import { logInWithGoogle, setSignupAttemptStatus, signUp } from '../../store/actions'
import { IS_USING_BACKEND } from '../../store/reducer'
import { Credentials } from '../../store/types'

import InputField from '../../components/InputFields/InputField'
import PasswordInputField from '../../components/InputFields/PasswordInputField'
import WarningLabels from '../../components/WarningLabels/WarningLabels'

import {
  ExistingUserSpan,
  LoginLink,
  OrSpan,
  SignupButton,
  SignupDiv,
  SignupDivTitle,
  SignupForm,
  SignupWarningDiv,
  StyledSignupPage,
} from './styles/SignupPage.styled'

// TODO make label go away when exit page
const RegisterPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  const { signupAttemptStatus } = useAppSelector((state) => state.neigh_reducer)
  const { h1, p } = { ...theme.typography.fontSize }
  const signupErrorLabel = signupErrorLabels[signupAttemptStatus]

  useEffect(() => {
    if (signupAttemptStatus === 'success') {
      navigate(PATHS.MAIN)
      // dispatch(setSignupAttemptStatus('redirect')) // TODO no need cos redirect to mainpage instead, no need 'redirect' status as well
      dispatch(setSignupAttemptStatus('initial'))
    }
  })

  const onSubmit = (data: FieldValues) => {
    const signupCredentials: Credentials = {
      email: data.Email.trim(),
      password: data.Password,
    }
    IS_USING_BACKEND && dispatch(signUp(signupCredentials))
  }

  const onGoogleSignIn = () => {
    IS_USING_BACKEND && dispatch(logInWithGoogle())
  }

  return (
    <StyledSignupPage>
      <SignupDiv>
        <SignupDivTitle fontType={h1}>Sign Up</SignupDivTitle>
        <SignupWarningDiv>
          <WarningLabels label={signupErrorLabel} isError={signupErrorLabel.length !== 0} />
        </SignupWarningDiv>
        <SignupForm onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputField
            title="Email"
            placeholder="Email"
            errorLabel={SIGNUP.EMAIL_INVALID}
            isError={errors.Email}
            register={register}
            pattern={emailRegex}
            required
          />
          <PasswordInputField
            title="Password"
            type="signup"
            placeholder="Password"
            errorLabel={SIGNUP.PASSWORD_INVALID}
            isError={errors.Password}
            register={register}
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
            pattern={passwordRegex}
            required
          />
          <SignupButton style={{ marginTop: '1vh' }} type="submit" text="Sign Up" />
        </SignupForm>
        <OrSpan>or</OrSpan>
        <GoogleButton type="light" onClick={onGoogleSignIn} disabled />
        <ExistingUserSpan fontType={p}>
          Have an account?&nbsp;
          <LoginLink fontType={p} onClick={() => navigate(PATHS.LOGIN)}>
            Log In
          </LoginLink>
          &nbsp;here!
        </ExistingUserSpan>
      </SignupDiv>
    </StyledSignupPage>
  )
}

export default RegisterPage
