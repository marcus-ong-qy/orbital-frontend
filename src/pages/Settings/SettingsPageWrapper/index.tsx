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

const SettingsPageWrapper = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  const navigate = useNavigate()
  const { h1, h3 } = { ...theme.typography.fontSize }

  // TODO set a isLoading cos some pages take time to load, which seems like the link not responsive
  return (
    <StyledSettingsPage>
      <SettingsMenuDiv>
        <MenuSubDiv>
          <MenuSubtitle fontType={h1}>My Account</MenuSubtitle>
          <MenuHyperlink fontType={h3} onClick={() => navigate(PATHS.USER_PROFILE)}>
            My Profile
          </MenuHyperlink>
          <MenuHyperlink fontType={h3} onClick={() => navigate(PATHS.EDIT_USER_PROFILE)}>
            Edit Profile
          </MenuHyperlink>
        </MenuSubDiv>
        <MenuSubDiv>
          <MenuSubtitle fontType={h1}>Marketplace</MenuSubtitle>
          <MenuHyperlink fontType={h3} onClick={() => alert('TODO')}>
            My Orders
          </MenuHyperlink>
          <MenuHyperlink fontType={h3} onClick={() => navigate(PATHS.USER_LISTINGS)}>
            My Listings
          </MenuHyperlink>
        </MenuSubDiv>
        <MenuSubDiv>
          <MenuSubtitle fontType={h1}>Community</MenuSubtitle>
          <MenuHyperlink fontType={h3} onClick={() => alert('TODO')}>
            My Groups
          </MenuHyperlink>
          <MenuHyperlink fontType={h3} onClick={() => alert('TODO')}>
            My Activities
          </MenuHyperlink>
          <MenuHyperlink fontType={h3} onClick={() => alert('TODO')}>
            My Achievements
          </MenuHyperlink>
          <MenuHyperlink fontType={h3} onClick={() => alert('TODO')}>
            Activities History
          </MenuHyperlink>
        </MenuSubDiv>
      </SettingsMenuDiv>
      <ContentDiv>{children}</ContentDiv>
    </StyledSettingsPage>
  )
}

export default SettingsPageWrapper
