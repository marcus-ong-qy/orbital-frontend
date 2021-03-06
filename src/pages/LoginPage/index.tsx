import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FieldValues, useForm } from 'react-hook-form'
import GoogleButton from 'react-google-button'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { LOGIN, SIGNUP } from '../../common/warnings'
import { theme } from '../../styles/Theme'
import { PATHS } from '../../routes/PATHS'

import {
  logIn,
  logInOffline,
  logInWithGoogle,
  setLoginAttemptStatus,
  setSignupAttemptStatus,
} from '../../store/actions'
import { IS_USING_BACKEND } from '../../store/reducer'
import { Credentials } from '../../store/types'

import Button from '../../components/Button/Button'
import InputField from '../../components/InputFields/InputField'
import PasswordInputField from '../../components/InputFields/PasswordInputField'
import WarningLabels from '../../components/WarningLabels/WarningLabels'

import {
  ForgetPwdLink,
  ForgetPwdSpan,
  LoginDiv,
  LoginDivTitle,
  LoginForm,
  NewUserSpan,
  OrSpan,
  SignUpLink,
  StyledLoginPage,
} from './styles/LoginPage.styled'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { register, handleSubmit, setValue, setError } = useForm({
    mode: 'onSubmit',
  })
  const { loginAttemptStatus, signupAttemptStatus } = useAppSelector((state) => state.neigh_reducer)
  const { h1, p, labelFont } = { ...theme.typography.fontSize }

  useEffect(() => {
    if (loginAttemptStatus === 'success') {
      navigate(PATHS.MAIN)
      dispatch(setLoginAttemptStatus('initial'))
      dispatch(setSignupAttemptStatus('initial'))
    }
  })

  const onSubmit = (data: FieldValues) => {
    const loginCredentials: Credentials = {
      email: data.Email.trim(),
      password: data.Password,
    }
    dispatch(IS_USING_BACKEND ? logIn(loginCredentials) : logInOffline(loginCredentials))
  }

  const onGoogleSignIn = () => {
    IS_USING_BACKEND && dispatch(logInWithGoogle())
  }

  return (
    <StyledLoginPage>
      <LoginDiv>
        <LoginDivTitle fontType={h1}>Log In</LoginDivTitle>
        <WarningLabels label={SIGNUP.SUCCESSFUL} isError={signupAttemptStatus === 'redirect'} />
        <LoginForm onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputField title="Email" placeholder="Email" register={register} required />
          <PasswordInputField
            title="Password"
            type="login"
            placeholder="Password"
            errorLabel={LOGIN.INVALID}
            isError={loginAttemptStatus === 'invalid'}
            register={register}
            setValue={setValue}
            setError={setError}
            required
          />
          <Button type="submit" text="Login" />
        </LoginForm>
        <ForgetPwdSpan>
          <ForgetPwdLink fontType={labelFont} onClick={() => navigate(PATHS.FORGET_PASSWORD)}>
            Forget Password?
          </ForgetPwdLink>
        </ForgetPwdSpan>
        <OrSpan>or</OrSpan>
        <GoogleButton type="light" onClick={onGoogleSignIn} disabled />
        <NewUserSpan fontType={p}>
          New to this site?&nbsp;
          <SignUpLink fontType={p} onClick={() => navigate(PATHS.REGISTER)}>
            Sign Up
          </SignUpLink>
          &nbsp;here!
        </NewUserSpan>
      </LoginDiv>
    </StyledLoginPage>
  )
}

export default LoginPage
