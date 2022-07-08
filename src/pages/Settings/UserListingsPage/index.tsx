import { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getUserListings } from '../../../store/marketplace/actions'
import { ItemListing } from '../../../store/marketplace/types'

import SettingsPageWrapper from '../SettingsPageWrapper'
import HorizontalListingBar from '../../../components/common/HorizontalListingBar/HorizontalListingBar'

import {
  NoListingsLabel,
  UserListingsDiv,
  UserListingTitle,
} from './styles/UserListingsPage.styled'

/**
 * A sorting function that sorts ItemListing first by status === 'offered', then by timeCreated
 */
const sortListingsByReservedStatus = (item1: ItemListing, item2: ItemListing) =>
  Number(item2.status === 'offered') - Number(item1.status === 'offered') ||
  item2.timeCreated - item1.timeCreated

const UserListingsPage = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { navTitleFont, h1 } = { ...theme.typography.fontSize }

  const { allUserListings } = useAppSelector((state) => state.marketplace_reducer)
  const [sortedUserListings, setSortedUserListings] = useState(allUserListings)

  useEffect(() => {
    dispatch(getUserListings('any'))
  }, [])

  useEffect(() => {
    const allUserListingsSorted = allUserListings.sort(sortListingsByReservedStatus)
    setSortedUserListings(allUserListingsSorted)
  }, [allUserListings])

  return (
    <SettingsPageWrapper>
      <UserListingTitle fontType={navTitleFont}>My Listings</UserListingTitle>
      {sortedUserListings.length ? (
        <UserListingsDiv>
          {sortedUserListings.map((listing, index) => {
            return <HorizontalListingBar key={index} itemListing={listing} />
          })}
        </UserListingsDiv>
      ) : (
        <NoListingsLabel fontType={h1}>No Listings Found</NoListingsLabel>
      )}
    </SettingsPageWrapper>
  )
}

export default UserListingsPage
