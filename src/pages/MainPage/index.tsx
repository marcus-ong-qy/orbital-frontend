import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';

const MainPage = () => {
  const { loginCredentials } = useSelector(
    (state: RootState) => state.neigh_reducer
  );
  const { username, passwordInput } = loginCredentials;

  return (
    <div data-testid="MarketplaceMain">
      <h1>Main Page</h1>
      <div>Username: {username}</div>
      <div>Password: {passwordInput}</div>
    </div>
  );
};

export default MainPage;
