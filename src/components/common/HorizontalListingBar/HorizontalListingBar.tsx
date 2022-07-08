import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from 'styled-components'

import { useAppSelector } from '../../../app/hooks'
import { PATHS } from '../../../routes/PATHS'
import formatPrice from '../../../common/formatPrice'
import { ItemListing } from '../../../store/marketplace/types'

import {
  ListingBarDiv,
  ListingInfoDiv,
  ListingTitle,
  ListingStatusDiv,
  StatusLabel,
  PriceTag,
  ItemPic,
  PriceStyled,
} from './styles/HorizontalListingBar.styled'

import defaultPic from '../../../assets/picture.png'

const HorizontalListingBar = ({ itemListing }: { itemListing: ItemListing }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { userFirebaseProfile } = useAppSelector((state) => state.auth_reducer)
  const { name, typeOfTransaction, price, imageURL, status } = { ...itemListing }
  const { h2 } = { ...theme.typography.fontSize }

  const [statusText, setStatusText] = useState('')
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    setIsOwner(userFirebaseProfile.uid === itemListing.createdBy)
  }, [userFirebaseProfile, itemListing])

  useEffect(() => {
    switch (status) {
      case 'available':
        setStatusText(typeOfTransaction === 'Sell' ? 'For Sale' : 'For Rent')
        break
      case 'offered':
        setStatusText(isOwner ? 'Offer!' : 'Reserved')
        break
      case 'sold':
      case 'Sold' as any: // TODO check with backend
        setStatusText(typeOfTransaction === 'Sell' ? 'Sold' : 'Rented')
        break
    }
  }, [itemListing, isOwner])

  const onClick = () => {
    navigate(`${PATHS.ITEM}/${itemListing._id}`)
  }

  return (
    <ListingBarDiv onClick={onClick}>
      <ListingInfoDiv>
        <ListingTitle fontType={h2}>{name}</ListingTitle>
        <ListingStatusDiv>
          <StatusLabel
            type={typeOfTransaction}
            available={status === 'available'}
            offerAlert={isOwner && status === 'offered'}
          >
            {statusText}
          </StatusLabel>
          <PriceTag>
            for&nbsp;
            <b>
              <PriceStyled>${formatPrice(price)}</PriceStyled>
              {typeOfTransaction === 'Rent' && '/day'}
            </b>
          </PriceTag>
        </ListingStatusDiv>
      </ListingInfoDiv>
      <ItemPic src={imageURL ? imageURL : defaultPic} />
    </ListingBarDiv>
  )
}

export default HorizontalListingBar
