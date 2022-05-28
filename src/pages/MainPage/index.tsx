import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import { PATHS } from '../../routes/PATHS';
import { auth, getUserProfile, logout } from '../../firebase';
import { defaultUserProfile } from '../../store/reducer';
import { UserProfile } from '../../store/types';

const MainPage = () => {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] =
    useState<UserProfile>(defaultUserProfile);

  onAuthStateChanged(auth, (user) => {
    if (user && userProfile === defaultUserProfile)
      setUserProfile(getUserProfile(user));
  });

  const signOutOnClick = () => {
    logout();
    navigate(PATHS.LOGIN);
  };

  return (
    <div data-testid="MarketplaceMain">
      <h1>Main Page</h1>
      <div>Name: {userProfile.displayName}</div>
      <div>
        Email: {userProfile.email}&nbsp;
        {userProfile.emailVerified && '(Verified)'}
      </div>
      <div>
        <div>Photo:</div>
        <img src={userProfile.photoURL!} alt="don't have" />
      </div>
      <button onClick={signOutOnClick}>Sign Out</button>
    </div>
  );
};

export default MainPage;
