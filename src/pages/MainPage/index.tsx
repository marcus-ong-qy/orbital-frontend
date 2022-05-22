import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';

const MainPage = () => {
  const { loginCredentials } = useSelector(
    (state: RootState) => state.neigh_reducer
  );
  const { email, password } = loginCredentials;

  return (
    <div data-testid="MarketplaceMain">
      <h1>Main Page</h1>
      <div>Username: {email}</div>
      <div>Password: {password}</div>
    </div>
  );
};

export default MainPage;
