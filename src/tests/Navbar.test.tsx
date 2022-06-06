import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { AppWithStore, login } from './GlobalTestFunctions'

// Login Page
describe('Navigation Bar', () => {
  test('username shows upon login', async () => {
    render(<AppWithStore />)

    await waitFor(() => {
      const loginLink = screen.getByText('Log In')
      fireEvent.click(loginLink)
      login()
    })

    await waitFor(() => {
      const usernameLabel = screen.getByTestId('navbar-username')
      expect(usernameLabel).toBeInTheDocument()
    })
  })

  test('access my accounts page from navbar', async () => {
    render(<AppWithStore />)

    await waitFor(() => {
      const loginLink = screen.getAllByText('Log In')[0] // TODO make more rigid
      fireEvent.click(loginLink)
    })

    await waitFor(() => {
      login()
    })

    await waitFor(() => {
      const usernameLabel = screen.getByTestId('navbar-username')
      fireEvent.mouseEnter(usernameLabel)
    })

    await waitFor(() => {
      const myAccount = screen.getByText('My Account')
      fireEvent.click(myAccount)
    })

    await waitFor(() => {
      const userProfilePage = screen.getByTestId('user-profile-page')
      expect(userProfilePage).toBeInTheDocument()
    })
  })
})
