import { useNavigate } from 'react-router-dom'
import { useTheme } from 'styled-components'

import { useAppSelector } from '../../../app/hooks'
import { PATHS } from '../../../routes/PATHS'

import LoadingSpin from '../../../components/common/LoadingSpin/LoadingSpin'

import {
  ContentDiv,
  MenuHyperlink,
  MenuSubDiv,
  MenuSubtitle,
  SettingsMenuDiv,
  StyledSettingsPage,
} from './styles/SettingsPageWrapper.styled'
import PleaseLoginNotice from '../../../components/common/PleaseLoginNotice/PleaseLoginNotice'

const SettingsPageWrapper = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { h1, h3 } = { ...theme.typography.fontSize }
  const { isLoading, isLoggedIn } = useAppSelector((state) => state.auth_reducer)

  // TODO set a isLoading cos some pages take time to load, which seems like the link not responsive
  return (
    <StyledSettingsPage>
      {isLoggedIn ? (
        isLoading ? (
          <LoadingSpin />
        ) : (
          <>
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
                <MenuHyperlink fontType={h3} onClick={() => navigate(PATHS.USER_ORDERS)}>
                  My Orders
                </MenuHyperlink>
                <MenuHyperlink fontType={h3} onClick={() => navigate(PATHS.USER_LISTINGS)}>
                  My Listings
                </MenuHyperlink>
              </MenuSubDiv>
              {/* <MenuSubDiv>
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
        </MenuSubDiv> */}
            </SettingsMenuDiv>
            <ContentDiv>{children}</ContentDiv>
          </>
        )
      ) : (
        <PleaseLoginNotice />
      )}
    </StyledSettingsPage>
  )
}

export default SettingsPageWrapper
