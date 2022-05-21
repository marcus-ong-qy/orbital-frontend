import {
  fireEvent,
  getByText,
  queryByText,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './store/store';
import { theme } from './styles/Theme';

const AppWithStore = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

// Login Page
test('login page loads', async () => {
  render(<App />);
  await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

  const loginPage = screen.getByTestId('login-page');
  expect(loginPage).toBeInTheDocument();
});

test('login button has correct text and colour', () => {
  render(<App />);

  const loginButton = screen.getByRole('button', { name: 'Login' });

  expect(loginButton).toHaveStyle(`
    color: ${theme.palette.common.gray};
    background-color: ${theme.palette.secondary};
  `);
});

test('invalid login', () => {
  render(<AppWithStore />);
  // TODO

  const loginButton = screen.getByRole('button', { name: 'Login' });
  fireEvent.click(loginButton);

  const warningLabel = screen.getByText('User/Password Invalid!');
  expect(warningLabel).toBeInTheDocument();
});

test('valid login', () => {
  render(<AppWithStore />);

  throw new Error();
});

// test('caps lock indicator appears', async () => {
//   render(<App />);
//   await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

//   const passwordInput = screen.getByPlaceholderText('Password');
//   fireEvent.select(passwordInput);
//   fireEvent.keyDown(passwordInput, { key: 'CapsLock', code: 'CapsLock' });

//   await waitFor(() => {
//     const capsLockIndicator = screen.getByTestId('BigA');
//     expect(capsLockIndicator).toBeInTheDocument();
//   });
// });
