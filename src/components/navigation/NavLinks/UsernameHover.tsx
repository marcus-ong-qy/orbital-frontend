import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { useTheme } from 'styled-components'

import { auth } from '../../../firebase'
import { PATHS } from '../../../routes/PATHS'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'

import { getUserData, logout } from '../../../store/authentication/actions'
import { FirebaseProfile } from '../../../store/authentication/types'

import {
  DropdownButtons,
  DropdownDiv,
  StyledUsernameHover,
  UsernameDiv,
  UsernameSpan,
} from './styles/NavLinks.styled'

const UsernameHover = ({
  userFirebaseProfile,
  maxWidth,
}: {
  userFirebaseProfile: FirebaseProfile
  maxWidth: string
}) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { h3 } = { ...theme.typography.fontSize }

  const { userData } = useAppSelector((state) => state.auth_reducer)

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      user && dispatch(getUserData())
    })
  }, [])

  const myAccOnClick = () => {
    navigate(PATHS.USER_PROFILE)
  }

  const logoutOnClick = () => {
    logout()
    window.location.reload()
  }

  const [usernameEnter, setUsernameEnter] = useState(false)
  const [dropdownEnter, setDropdownEnter] = useState(false)

  const showDropdown = usernameEnter || dropdownEnter

  return (
    <UsernameDiv>
      <UsernameSpan>
        <StyledUsernameHover
          data-testid="navbar-username"
          maxWidth={maxWidth}
          onMouseEnter={() => setUsernameEnter(true)}
          onMouseLeave={() => setUsernameEnter(false)}
        >
          {!!userData.username ? userData.username : userFirebaseProfile.email}
        </StyledUsernameHover>
      </UsernameSpan>
      {showDropdown && (
        <DropdownDiv
          onMouseEnter={() => setDropdownEnter(true)}
          onMouseLeave={() => setDropdownEnter(false)}
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
