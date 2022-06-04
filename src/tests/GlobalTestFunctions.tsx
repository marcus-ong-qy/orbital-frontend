import { fireEvent, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'

import App from '../App'
import { demoAcc } from '../demo-config'
import { store } from '../store/store'

export const AppWithStore = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export const login = () => {
  const loginButton = screen.getByRole('button', { name: 'Login' })
  const emailInput = screen.getByPlaceholderText('Email')
  const passwordInput = screen.getByPlaceholderText('Password')

  fireEvent.change(emailInput, { target: { value: demoAcc.email } })
  fireEvent.change(passwordInput, {
    target: { value: demoAcc.password },
  })
  fireEvent.click(loginButton)
}
