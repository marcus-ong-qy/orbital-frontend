import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { theme } from '../../styles/Theme'
import { PATHS } from '../../routes/PATHS'
import { logout } from '../../store/authentication/actions'
import { ProfileInfo } from '../../store/authentication/types'

import {
  DropdownButtons,
  DropdownDiv,
  StyledNavLink,
  UsernameDiv,
  UsernameSpan,
} from './styles/NavLinks.styled'

const UsernameHover = ({ userProfile }: { userProfile: ProfileInfo }) => {
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  const { h3 } = { ...theme.typography.fontSize }

  const myAccOnClick = () => {
    navigate(PATHS.USER_PROFILE)
  }

  const logoutOnClick = () => {
    logout()
    window.location.reload()
  }

  return (
    <UsernameDiv>
      <UsernameSpan>
        <StyledNavLink
          data-testid="navbar-username"
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
