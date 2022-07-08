import { useEffect } from 'react'
import { useTheme } from 'styled-components'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getUserListings } from '../../../store/marketplace/actions'

import SettingsPageWrapper from '../SettingsPageWrapper'
import HorizontalListingBar from '../../../components/common/HorizontalListingBar/HorizontalListingBar'

import { NoOrdersLabel, UserOrdersDiv, UserOrderTitle } from './styles/UserOrdersPage.styled'

const UserOrdersPage = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { navTitleFont, h1 } = { ...theme.typography.fontSize }

  const { allUserReservations } = useAppSelector((state) => state.marketplace_reducer)

  useEffect(() => {
    dispatch(getUserListings('reservation'))
  }, [])

  return (
    <SettingsPageWrapper>
      <UserOrderTitle fontType={navTitleFont}>My Orders</UserOrderTitle>
      {allUserReservations.length ? (
        <UserOrdersDiv>
          {allUserReservations.map((listing, index) => {
            return <HorizontalListingBar key={index} itemListing={listing} />
          })}
        </UserOrdersDiv>
      ) : (
        <NoOrdersLabel fontType={h1}>No Orders Found</NoOrdersLabel>
      )}
    </SettingsPageWrapper>
  )
}

export default UserOrdersPage
