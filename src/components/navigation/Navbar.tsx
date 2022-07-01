import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { useTheme } from 'styled-components'

import { auth, getUserFirebaseProfile } from '../../firebase'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { PATHS } from '../../routes/PATHS'

import { defaultUserFirebaseProfile } from '../../store/authentication/reducer'
import { setNewListing } from '../../store/marketplace/actions'

import NavLink from './NavLinks/NavLink'
import UsernameHover from './NavLinks/UsernameHover'
import SearchBar from './Searchbar/Searchbar'
import DarkModeToggleSwitch from './DarkModeToggleSwitch/DarkModeToggleSwitch'

import {
  BodyDiv,
  NavbarTitle,
  SearchDiv,
  // ShoppingCart,
  ThemeSwitchDiv,
  StyledLandingPageNav,
  StyledLogo,
} from './styles/Navbars.styled'
import { LinkGroupSpan, NavLinks } from './NavLinks/styles/NavLinks.styled'

import horseLogo from '../../assets/Neigh-logos_transparent.png'
import { setUserFirebaseProfile, setIsLoggedIn } from '../../store/authentication/actions'
// import shoppingCartLogo from '../../assets/shopping-cart.png'

const Navbar = ({
  title,
}: // type, // TODO create a type for community
{
  title: string
  // type: 'marketplace' | 'community'
}) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { navTitleFont, navLinkFont } = { ...theme.typography.fontSize }

  const { isLoggedIn, userFirebaseProfile } = useAppSelector((state) => state.auth_reducer)
  const { newListing } = useAppSelector((state) => state.marketplace_reducer)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && !isLoggedIn) {
        dispatch(setUserFirebaseProfile(getUserFirebaseProfile(user)))
        dispatch(setIsLoggedIn(true))
      } else if (!user && isLoggedIn) {
        dispatch(setUserFirebaseProfile(defaultUserFirebaseProfile))
        dispatch(setIsLoggedIn(false))
      }
    })
  })

  const sellOnClick = () => {
    navigate(PATHS.UPLOAD_LISTING)
    dispatch(setNewListing({ ...newListing, typeOfTransaction: 'Sell' }))
  }

  // const rentOnClick = () => {
  //   navigate(PATHS.UPLOAD_LISTING)
  //   dispatch(setNewListing({ ...newListing, typeOfTransaction: 'Rent' }))
  // }

  return (
    <StyledLandingPageNav>
      <StyledLogo src={horseLogo} onClick={() => navigate('/neigh') /* easter egg */} />
      <NavbarTitle fontType={navTitleFont} onClick={() => navigate(PATHS.MAIN)}>
        {title}
      </NavbarTitle>
      <BodyDiv width="100%">
        <NavLinks fontType={navLinkFont} justify="space-between">
          <LinkGroupSpan>
            {/* <NavLink text="Community" onClick={() => navigate(PATHS.COMMUNITY)} /> */}
            <NavLink text="Marketplace" onClick={() => navigate(PATHS.MAIN)} />
            {/* &nbsp;|&nbsp;
            <NavLink text="Sell" onClick={sellOnClick} />
            &nbsp;|&nbsp;
            <NavLink text="Rent" onClick={rentOnClick} /> */}
            {isLoggedIn && (
              <>
                &nbsp;|&nbsp;
                <NavLink text="Upload" onClick={sellOnClick} />
              </>
            )}
          </LinkGroupSpan>
          {isLoggedIn ? (
            <>
              <LinkGroupSpan width="25vw" margin="0 0vw 0 0">
                {/* <NavLink text="Notifications" onClick={() => alert('TODO')} />
                &nbsp;|&nbsp;
                <NavLink text="Settings" onClick={() => alert('TODO')} />
                &nbsp;|&nbsp; */}
                <UsernameHover maxWidth="20vw" userFirebaseProfile={userFirebaseProfile} />
              </LinkGroupSpan>
            </>
          ) : (
            <LinkGroupSpan width="25vw">
              <NavLink text="Log In" onClick={() => navigate(PATHS.LOGIN)} />
              &nbsp;|&nbsp;
              <NavLink text="Sign Up" onClick={() => navigate(PATHS.REGISTER)} />
            </LinkGroupSpan>
          )}
        </NavLinks>
        <SearchDiv>
          <SearchBar />
          <ThemeSwitchDiv>
            {/* <ShoppingCart src={shoppingCartLogo} /> */}
            <DarkModeToggleSwitch />
          </ThemeSwitchDiv>
        </SearchDiv>
      </BodyDiv>
    </StyledLandingPageNav>
  )
}

export default Navbar
