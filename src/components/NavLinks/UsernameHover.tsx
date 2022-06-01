import { useState } from 'react'

import { theme } from '../../styles/Theme'
import { logout } from '../../store/actions'
import { ProfileInfo } from '../../store/types'

import {
  DisplayPic,
  DropdownButtons,
  DropdownDiv,
  StyledNavLink,
  UsernameDiv,
  UsernameSpan,
} from './styles/NavLinks.styled'

import defaultAvatar from '../../assets/default_avatar.png'

const UsernameHover = ({
  userProfile,
  hideAvatar,
}: {
  userProfile: ProfileInfo
  hideAvatar?: boolean
}) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const { h3 } = { ...theme.typography.fontSize }

  const myAccOnClick = () => {
    // TODO
  }

  const logoutOnClick = () => {
    logout()
    window.location.reload()
  }

  return (
    <UsernameDiv>
      <UsernameSpan>
        {!hideAvatar && <DisplayPic src={userProfile.photoURL ?? defaultAvatar} alt="don't have" />}
        <StyledNavLink
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          {userProfile.displayName ?? userProfile.email}
        </StyledNavLink>
      </UsernameSpan>
      {showDropdown && (
        <DropdownDiv
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <DropdownButtons fontType={h3} onClick={myAccOnClick}>
            My Account
          </DropdownButtons>
          <DropdownButtons fontType={h3} onClick={logoutOnClick}>
            Logout
          </DropdownButtons>
        </DropdownDiv>
      )}
    </UsernameDiv>
  )
}

export default UsernameHover
