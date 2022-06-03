import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { Provider } from 'react-redux'

import App from '../App'
import { demoAcc } from '../demo-config'
import { store } from '../store/store'
import { theme } from '../styles/Theme'

import { LOGIN, SIGNUP, signupErrorLabels } from '../common/warnings'

const AppWithStore = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

// Login Page
describe('Authentication Pages', () => {
  test('login - page loads', async () => {
    render(<App />)
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

    const loginButton = screen.getByRole('button', { name: 'Login' })
    expect(loginButton).toBeInTheDocument()
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
      const warningLabel = screen.getByText(LOGIN.INVALID)
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
      const warningLabel = screen.getByText(LOGIN.INVALID)
      expect(warningLabel).toBeInTheDocument()
    })
  })

  test('login - valid', async () => {
    render(<AppWithStore />)

    const loginButton = screen.getByRole('button', { name: 'Login' })
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')

    fireEvent.change(emailInput, { target: { value: demoAcc.email } })
    fireEvent.change(passwordInput, {
      target: { value: demoAcc.password },
    })
    fireEvent.click(loginButton)

    await waitFor(() => {
      const marketplaceMainPage = screen.getByTestId('MarketplaceMain') // TODO replace with component
      expect(marketplaceMainPage).toBeInTheDocument()
    })
  })

  test('sign out - valid', async () => {
    render(<AppWithStore />)

    const signoutButton = screen.getByRole('button', { name: 'Sign Out' })
    fireEvent.click(signoutButton)

    await waitFor(() => {
      const loginButton = screen.getByRole('button', { name: 'Login' })
      expect(loginButton).toBeInTheDocument()
    })
  })

  test('sign up - invalid email', async () => {
    render(<AppWithStore />)

    const signupLink = screen.getAllByText('Sign Up')
    fireEvent.click(signupLink[0])

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

    const signupButton = screen.getByRole('button', { name: 'Sign Up' })
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')

    fireEvent.change(emailInput, { target: { value: 'm@m.m' } })
    fireEvent.change(passwordInput, {
      target: { value: 'abcdefgh1!' },
    })
    fireEvent.click(signupButton)

    await waitFor(() => {
      const emailErrorLabel = screen.getByText(signupErrorLabels['email-invalid'])
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
      const accountExistsLabel = screen.getByText(signupErrorLabels['account-exists'])
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
      const passwordInvalidWarning = screen.getByText(SIGNUP.PASSWORD_INVALID)
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
      const passwordInvalidWarning = screen.getByText(SIGNUP.PASSWORD_INVALID)
      expect(passwordInvalidWarning).toBeInTheDocument()
    })
  })
})
