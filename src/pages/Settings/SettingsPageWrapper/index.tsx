import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../../routes/PATHS'
import { theme } from '../../../styles/Theme'

import {
  ContentDiv,
  MenuHyperlink,
  MenuSubDiv,
  MenuSubtitle,
  SettingsMenuDiv,
  StyledSettingsPage,
} from './styles/SettingsPageWrapper.styled'

const SettingsPageWrapper = ({ children }: { children: JSX.Element[] }) => {
  const navigate = useNavigate()
  const { h1, p } = { ...theme.typography.fontSize }

  // TODO set a isLoading cos some pages take time to load, which seems like the link not responsive
  return (
    <StyledSettingsPage data-testid="user-profile-page">
      <SettingsMenuDiv>
        <MenuSubDiv>
          <MenuSubtitle fontType={h1} onClick={() => navigate(PATHS.USER_PROFILE)}>
            My Account
          </MenuSubtitle>
          <MenuHyperlink fontType={p}>My Profile</MenuHyperlink>
          <MenuHyperlink fontType={p}>Edit Profile</MenuHyperlink>
        </MenuSubDiv>
        <MenuSubDiv>
          <MenuSubtitle fontType={h1}>Marketplace</MenuSubtitle>
          <MenuHyperlink fontType={p}>My Orders</MenuHyperlink>
          <MenuHyperlink fontType={p} onClick={() => navigate(PATHS.USER_LISTINGS)}>
            My Listings
          </MenuHyperlink>
        </MenuSubDiv>
        <MenuSubDiv>
          <MenuSubtitle fontType={h1}>Community</MenuSubtitle>
          <MenuHyperlink fontType={p}>My Groups</MenuHyperlink>
          <MenuHyperlink fontType={p}>My Activities</MenuHyperlink>
          <MenuHyperlink fontType={p}>My Achievements</MenuHyperlink>
          <MenuHyperlink fontType={p}>Activities History</MenuHyperlink>
        </MenuSubDiv>
      </SettingsMenuDiv>
      <ContentDiv>{children}</ContentDiv>
    </StyledSettingsPage>
  )
}

export default SettingsPageWrapper
