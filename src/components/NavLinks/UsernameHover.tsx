import { useState } from 'react'
import {
  DisplayPic,
  DropdownDiv,
  StyledNavLink,
  UsernameDiv,
  UsernameSpan,
} from './styles/NavLinks.styled'

import defaultAvatar from '../../assets/default_avatar.png'
import { ProfileInfo } from '../../store/types'

const UsernameHover = ({
  // text,
  userProfile,
}: {
  // text: string
  userProfile: ProfileInfo
  // onMouseEnter: React.MouseEventHandler<HTMLSpanElement>
}) => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <UsernameDiv>
      <UsernameSpan>
        <DisplayPic src={userProfile.photoURL ?? defaultAvatar} alt="don't have" />
        <StyledNavLink onMouseEnter={() => setShowDropdown(true)}>
          {userProfile.displayName ?? userProfile.email}
        </StyledNavLink>
      </UsernameSpan>
      {showDropdown && (
        <DropdownDiv>
          <div>My Account</div>
          <div>Logout</div>
        </DropdownDiv>
      )}
    </UsernameDiv>
  )
}

export default UsernameHover
