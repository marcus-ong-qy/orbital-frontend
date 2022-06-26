import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { TEXTS } from '../../../common/texts'
import { auth, getUserFirebaseProfile } from '../../../firebase'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { theme } from '../../../styles/Theme'

import { defaultUserFirebaseProfile } from '../../../store/authentication/reducer'
import { FirebaseProfile } from '../../../store/authentication/types'
import { getListings } from '../../../store/marketplace/actions'

import ItemDisplay from '../../../components/marketplace/ItemDisplay/ItemDisplay'

import {
  CarouselDiv,
  CategoriesDiv,
  FeaturedDiv,
  FeaturedItemsContainer,
  GreetingsDiv,
  GreetingsSpan,
  GreetingsUsernameSpan,
  HorseHead,
  ItemsContainer,
  ListingsDiv,
  StyledMainPage,
  Title,
} from './styles/MainPage.styled'

import horseHead from '../../../assets/Horse-head-transparent.png'
import LoadingSpin from '../../../components/common/LoadingSpin/LoadingSpin'

const MainPage = () => {
  const dispatch = useAppDispatch()

  const { navTitleFont, h1 } = { ...theme.typography.fontSize }

  const { isLoading } = useAppSelector((state) => state.auth_reducer)
  const { allListings } = useAppSelector((state) => state.marketplace_reducer)

  const [userFirebaseProfile, setUserFirebaseProfile] = useState<FirebaseProfile>(
    defaultUserFirebaseProfile,
  )
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    dispatch(getListings())
  }, [])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && !isLoggedIn) {
        setUserFirebaseProfile(getUserFirebaseProfile(user))
        setIsLoggedIn(true)
      } else if (!user && isLoggedIn) {
        setUserFirebaseProfile(defaultUserFirebaseProfile)
        setIsLoggedIn(false)
      }
    })
  })

  return (
    <StyledMainPage data-testid="MarketplaceMain">
      {isLoading ? (
        <LoadingSpin />
      ) : (
        <>
          <GreetingsDiv fontType={navTitleFont}>
            <HorseHead src={horseHead} />
            <GreetingsSpan>
              {`${TEXTS.GREETINGS}, `}
              {isLoggedIn ? (
                <GreetingsUsernameSpan>{userFirebaseProfile.email}</GreetingsUsernameSpan>
              ) : (
                'stranger'
              )}
              !
            </GreetingsSpan>
          </GreetingsDiv>

          {/* <CarouselDiv>
        <h1>Carousel Under Construction</h1>
      </CarouselDiv> */}

          {/* <FeaturedDiv>
        <Title fontType={h1}>Featured</Title>
        <FeaturedItemsContainer>
          {allListings?.map((item, index) => {
            return <ItemDisplay key={index} item={item} />
          })}
        </FeaturedItemsContainer>
      </FeaturedDiv> */}

          {/* <CategoriesDiv>
        <Title fontType={h1}>Categories</Title>
      </CategoriesDiv> */}

          <ListingsDiv>
            <Title fontType={h1}>Listings</Title>
            <ItemsContainer>
              {allListings?.map((item, index) => (
                <ItemDisplay key={index} item={item} />
              ))}
            </ItemsContainer>
          </ListingsDiv>
        </>
      )}
    </StyledMainPage>
  )
}

export default MainPage
