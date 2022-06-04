import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { demoAcc } from '../demo-config'
import {
  LOGIN_WARNINGS,
  SIGNUP_WARNINGS,
  SIGNUP_ERROR_LABELS,
  RESET_PASSWORD_ERROR_LABELS,
} from '../common/warnings'
import { AppWithStore, login } from './GlobalTestFunctions'

// Login Page
describe('Authentication Pages', () => {
  test('login - page loads', async () => {
    render(<AppWithStore />)

    await waitFor(() => {
      const loginButton = screen.getByRole('button', { name: 'Login' })
      expect(loginButton).toBeInTheDocument()
    })
  })

  test('login - invalid user', async () => {
    render(<AppWithStore />)

    const loginButton = screen.getByRole('button', { name: 'Login' })
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')

    fireEvent.change(emailInput, { target: { value: 'blah' } })
    fireEvent.change(passwordInput, { target: { value: 'blah1234!' } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      const warningLabel = screen.getByText(LOGIN_WARNINGS.INVALID)
      expect(warningLabel).toBeInTheDocument()
    })
  })

  test('login - invalid password', async () => {
    render(<AppWithStore />)

    const loginButton = screen.getByRole('button', { name: 'Login' })
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')

    fireEvent.change(emailInput, { target: { value: demoAcc.email } })
    fireEvent.change(passwordInput, { target: { value: `${demoAcc.password}blah` } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      const warningLabel = screen.getByText(LOGIN_WARNINGS.INVALID)
      expect(warningLabel).toBeInTheDocument()
    })
  })

  test('login and sign out valid', async () => {
    render(<AppWithStore />)

    await waitFor(() => {
      login()
    })

    await waitFor(() => {
      const marketplaceMainPage = screen.getByTestId('MarketplaceMain') // TODO replace with component
      expect(marketplaceMainPage).toBeInTheDocument()
    })

    await waitFor(() => {
      const signoutButton = screen.getByRole('button', { name: 'Sign Out' })
      fireEvent.click(signoutButton)
    })

    await waitFor(() => {
      const loginButton = screen.getByRole('button', { name: 'Login' })
      expect(loginButton).toBeInTheDocument()
    })
  })

  test('sign up - invalid email', async () => {
    render(<AppWithStore />)

    const signupLink = screen.getAllByText('Sign Up')
    fireEvent.click(signupLink[0])

    await waitFor(() => {
      const signupButton = screen.getByRole('button', { name: 'Sign Up' })
      const emailInput = screen.getByPlaceholderText('Email')
      const passwordInput = screen.getByPlaceholderText('Password')

      fireEvent.change(emailInput, { target: { value: 'm@m.m' } })
      fireEvent.change(passwordInput, {
        target: { value: 'abcdefgh1!' },
      })
      fireEvent.click(signupButton)
    })
    await waitFor(() => {
      const emailErrorLabel = screen.getByText(SIGNUP_ERROR_LABELS['EMAIL_INVALID'])
      expect(emailErrorLabel).toBeInTheDocument()
    })
  })

  test('sign up - account existed', async () => {
    render(<AppWithStore />)

    const signupButton = screen.getByRole('button', { name: 'Sign Up' })
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')

    fireEvent.change(emailInput, { target: { value: demoAcc.email } })
    fireEvent.change(passwordInput, {
      target: { value: demoAcc.password },
    })
    fireEvent.click(signupButton)

    await waitFor(() => {
      const accountExistsLabel = screen.getByText(SIGNUP_ERROR_LABELS.ACCOUNT_EXISTS)
      expect(accountExistsLabel).toBeInTheDocument()
    })
  })

  test('sign up - password requires symbols error', async () => {
    render(<AppWithStore />)

    const passwordInput = screen.getByPlaceholderText('Password')

    fireEvent.change(passwordInput, {
      target: { value: 'password1' },
    })

    await waitFor(() => {
      const passwordInvalidWarning = screen.getByText(SIGNUP_WARNINGS.PASSWORD_INVALID)
      expect(passwordInvalidWarning).toBeInTheDocument()
    })
  })

  test('sign up - password minimum length error', async () => {
    render(<AppWithStore />)

    const passwordInput = screen.getByPlaceholderText('Password')

    fireEvent.change(passwordInput, {
      target: { value: 'pwd1!' },
    })

    await waitFor(() => {
      const passwordInvalidWarning = screen.getByText(SIGNUP_WARNINGS.PASSWORD_INVALID)
      expect(passwordInvalidWarning).toBeInTheDocument()
    })
  })

  test('forget password - email does not exist', async () => {
    render(<AppWithStore />)

    const loginLink = screen.getAllByText('Log In')[0]
    fireEvent.click(loginLink)

    await waitFor(() => {
      const forgetPwdLink = screen.getByText('Forget Password?')
      fireEvent.click(forgetPwdLink)
    })
    await waitFor(() => {
      const forgetPwdButton = screen.getByRole('button', { name: 'Reset Password' })
      const emailInput = screen.getByPlaceholderText('Email')

      fireEvent.change(emailInput, { target: { value: 'bla' } })
      fireEvent.click(forgetPwdButton)
    })
    await waitFor(() => {
      const emailInvalidWarning = screen.getByText(RESET_PASSWORD_ERROR_LABELS.EMAIL_INVALID)
      expect(emailInvalidWarning).toBeInTheDocument()
    })
  })
})
