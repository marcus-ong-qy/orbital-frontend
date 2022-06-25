import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FieldValues, useForm } from 'react-hook-form'
import GoogleButton from 'react-google-button'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { LOGIN_WARNINGS } from '../../../common/warnings'
import { theme } from '../../../styles/Theme'
import { PATHS } from '../../../routes/PATHS'

import {
  logIn,
  logInOffline,
  logInWithGoogle,
  setLoginAttemptStatus,
} from '../../../store/authentication/actions'
import { IS_USING_BACKEND } from '../../../store/authentication/reducer'
import { Credentials } from '../../../store/authentication/types'

import Button from '../../../components/common/Button/Button'
import InputField from '../../../components/common/InputFields/InputField'
import PasswordInputField from '../../../components/common/InputFields/PasswordInputField'

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
import LoadingSpin from '../../../components/common/LoadingSpin/LoadingSpin'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { register, handleSubmit, setValue, setError, formState } = useForm({
    mode: 'onSubmit',
  })
  const { isLoading, loginAttemptStatus } = useAppSelector((state) => state.auth_reducer)
  const { h1, p, labelFont } = { ...theme.typography.fontSize }

  useEffect(() => {
    if (loginAttemptStatus === 'SUCCESS') {
      navigate(PATHS.MAIN)
      dispatch(setLoginAttemptStatus('INITIAL'))
    }
  })

  const onSubmit = (data: FieldValues) => {
    console.log('sumbit')
    const loginCredentials: Credentials = {
      email: data.Email.trim(),
      password: data.Password,
    }
    dispatch(IS_USING_BACKEND ? logIn(loginCredentials) : logInOffline(loginCredentials))
  }

  const onGoogleSignIn = () => {
    IS_USING_BACKEND && dispatch(logInWithGoogle())
  }

  // useEffect(() => {
  //   console.log('errors', formState.errors)
  // }, [formState])

  // const emailField = useRef<any>(null)

  // useEffect(() => {
  //   console.log('the field', emailField)
  //   emailField.current && emailField.current.click()
  // }, [emailField])

  return (
    <StyledLoginPage>
      {isLoading ? (
        <LoadingSpin />
      ) : (
        <LoginDiv>
          <LoginDivTitle fontType={h1}>Log In</LoginDivTitle>
          <LoginForm onSubmit={handleSubmit(onSubmit)} noValidate>
            <InputField
              title="Email"
              placeholder="Email"
              // setValue={setValue}
              register={register}
              required
            />
            <PasswordInputField
              title="Password"
              type="login"
              placeholder="Password"
              errorLabel={LOGIN_WARNINGS.INVALID}
              isError={loginAttemptStatus === 'INVALID'}
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
          {/* <OrSpan>or</OrSpan>
        <GoogleButton type="light" onClick={onGoogleSignIn} disabled /> */}
          <NewUserSpan fontType={p}>
            New to this site?&nbsp;
            <SignUpLink fontType={p} onClick={() => navigate(PATHS.REGISTER)}>
              Sign Up
            </SignUpLink>
            &nbsp;here!
          </NewUserSpan>
        </LoginDiv>
      )}
    </StyledLoginPage>
  )
}

export default LoginPage
