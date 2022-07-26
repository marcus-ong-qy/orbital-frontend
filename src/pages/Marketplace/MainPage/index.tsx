import { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'

import { TEXTS } from '../../../common/texts'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'

import { getHomepageListings } from '../../../store/marketplace/actions'

import ItemDisplay from '../../../components/marketplace/ItemDisplay/ItemDisplay'
import LoadingSpin from '../../../components/common/LoadingSpin/LoadingSpin'

import {
  // CarouselDiv,
  // CategoriesDiv,
  // FeaturedDiv,
  // FeaturedItemsContainer,
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
import { filterAvailableListings, sortListingsByTime } from '../../../common/sortAndFilterListings'

const MainPage = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { navTitleFont, h1 } = { ...theme.typography.fontSize }

  const { isLoading, userData, isLoggedIn, userFirebaseProfile } = useAppSelector(
    (state) => state.auth_reducer,
  )
  const { allListings } = useAppSelector((state) => state.marketplace_reducer)
  const [sortedHompageListings, setSortedHompageListings] = useState(allListings)

  useEffect(() => {
    dispatch(getHomepageListings())
  }, [])

  useEffect(() => {
    const allHompageListingsSorted = [...allListings]
      .filter(filterAvailableListings)
      .sort(sortListingsByTime)
    setSortedHompageListings(allHompageListingsSorted)
  }, [allListings])

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
                <GreetingsUsernameSpan>
                  {userData.username?.length ? userData.username : userFirebaseProfile.email}
                </GreetingsUsernameSpan>
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
              {sortedHompageListings?.map((item, index) => (
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
