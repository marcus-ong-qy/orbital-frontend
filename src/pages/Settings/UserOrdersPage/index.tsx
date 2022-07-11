import { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getUserListings } from '../../../store/marketplace/actions'
import { sortListingsByOfferedFirst } from '../../../common/sortAndFilterListings'

import SettingsPageWrapper from '../SettingsPageWrapper'
import HorizontalListingBar from '../../../components/common/HorizontalListingBar/HorizontalListingBar'

import { NoOrdersLabel, UserOrdersDiv, UserOrderTitle } from './styles/UserOrdersPage.styled'

const UserOrdersPage = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { navTitleFont, h1 } = { ...theme.typography.fontSize }

  const { allUserListings, allUserReservations } = useAppSelector(
    (state) => state.marketplace_reducer,
  )
  const [sortedUserListings, setSortedUserListings] = useState(allUserListings)

  useEffect(() => {
    dispatch(getUserListings('reservation'))
  }, [])

  useEffect(() => {
    const allUserListingsSorted = [...allUserListings].sort(sortListingsByOfferedFirst)
    setSortedUserListings(allUserListingsSorted)
  }, [allUserListings])

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
function sortListingsByReservedStatus(sortListingsByReservedStatus: any) {
  throw new Error('Function not implemented.')
}
