import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FieldValues, useForm } from 'react-hook-form'
// import GoogleButton from 'react-google-button'
import { useTheme } from 'styled-components'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { PATHS } from '../../../routes/PATHS'
import { emailRegex, passwordRegex } from '../../../common/regex'
import { SIGNUP_WARNINGS, SIGNUP_ERROR_LABELS } from '../../../common/warnings'

import {
  // logInWithGoogle,
  setSignupAttemptStatus,
  signUp,
} from '../../../store/authentication/actions'
import { Credentials } from '../../../store/authentication/types'

import InputField from '../../../components/common/InputFields/InputField'
import PasswordInputField from '../../../components/common/InputFields/PasswordInputField'
import WarningLabels from '../../../components/common/WarningLabels/WarningLabels'
import LoadingSpin from '../../../components/common/LoadingSpin/LoadingSpin'

import {
  ExistingUserSpan,
  LoginLink,
  // OrSpan,
  SignupButton,
  SignupDiv,
  SignupDivTitle,
  SignupForm,
  SignupWarningDiv,
  StyledSignupPage,
} from './styles/SignupPage.styled'

// TODO make label go away when exit page
const RegisterPage = () => {
  const theme = useTheme()
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

  const { isLoading, signupAttemptStatus } = useAppSelector((state) => state.auth_reducer)
  const { h1, p } = { ...theme.typography.fontSize }
  const signupErrorLabel = SIGNUP_ERROR_LABELS[signupAttemptStatus]

  useEffect(() => {
    if (signupAttemptStatus === 'SUCCESS') {
      navigate(PATHS.MAIN)
      dispatch(setSignupAttemptStatus('INITIAL'))
    }
  }, [signupAttemptStatus, dispatch, navigate])

  const onSubmit = (data: FieldValues) => {
    const signupCredentials: Credentials = {
      email: data.Email.trim(),
      password: data.Password,
    }
    dispatch(signUp(signupCredentials))
  }

  // const onGoogleSignIn = () => {
  //   dispatch(logInWithGoogle())
  // }

  return (
    <StyledSignupPage>
      {isLoading ? (
        <LoadingSpin />
      ) : (
        <SignupDiv>
          <SignupDivTitle fontType={h1}>Sign Up</SignupDivTitle>
          <SignupWarningDiv>
            <WarningLabels label={signupErrorLabel} isError={signupErrorLabel.length !== 0} />
          </SignupWarningDiv>
          <SignupForm onSubmit={handleSubmit(onSubmit)} noValidate>
            <InputField
              title="Email"
              placeholder="Email"
              errorLabel={SIGNUP_WARNINGS.EMAIL_INVALID}
              isError={errors.Email}
              register={register}
              pattern={emailRegex}
              required
            />
            <PasswordInputField
              title="Password"
              type="signup"
              placeholder="Password"
              errorLabel={SIGNUP_WARNINGS.PASSWORD_INVALID}
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
          {/* <OrSpan>or</OrSpan>
        <GoogleButton type="light" onClick={onGoogleSignIn} disabled /> */}
          <ExistingUserSpan fontType={p}>
            Have an account?&nbsp;
            <LoginLink fontType={p} onClick={() => navigate(PATHS.LOGIN)}>
              Log In
            </LoginLink>
            &nbsp;here!
          </ExistingUserSpan>
        </SignupDiv>
      )}
    </StyledSignupPage>
  )
}

export default RegisterPage
