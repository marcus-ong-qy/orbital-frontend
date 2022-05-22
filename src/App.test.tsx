import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';

import App from './App';
import { demoAcc } from './store/actions';
import { store } from './store/store';
import { theme } from './styles/Theme';

// TODO replace getByTestId with screen content

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

// test('caps lock indicator appears', async () => {
//   render(<App />);

//   const passwordInput = screen.getByPlaceholderText('Password');
//   fireEvent.select(passwordInput);
//   fireEvent.keyDown(passwordInput, { key: 'CapsLock', code: 'CapsLock' });

//   await waitFor(() => {
//     const capsLockIndicator = screen.getByTestId('BigA');
//     expect(capsLockIndicator).toBeInTheDocument();
//   });
// });

test('invalid login (offline)', async () => {
  render(<AppWithStore />);

  const loginButton = screen.getByRole('button', { name: 'Login' });
  const userEmailInput = screen.getByPlaceholderText('Username/Email');
  const passwordInput = screen.getByPlaceholderText('Password');

  fireEvent.change(userEmailInput, { target: { value: 'blah' } });
  fireEvent.change(passwordInput, { target: { value: 'blah' } });
  fireEvent.click(loginButton);

  await waitFor(() => {
    const warningLabel = screen.getByText('User/Password Invalid!');
    expect(warningLabel).toBeInTheDocument();
  });
});

test('valid login (offline)', async () => {
  render(<AppWithStore />);
  const history = createMemoryHistory();

  const loginButton = screen.getByRole('button', { name: 'Login' });
  const userEmailInput = screen.getByPlaceholderText('Username/Email');
  const passwordInput = screen.getByPlaceholderText('Password');

  fireEvent.change(userEmailInput, { target: { value: demoAcc.username } });
  fireEvent.change(passwordInput, {
    target: { value: demoAcc.passwordInput },
  });
  fireEvent.click(loginButton);

  await waitFor(() => {
    const marketplaceMainPage = screen.getByTestId('MarketplaceMain');
    expect(marketplaceMainPage).toBeInTheDocument();
  });
});
