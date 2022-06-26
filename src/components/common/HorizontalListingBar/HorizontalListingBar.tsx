import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { PATHS } from '../../../routes/PATHS'
import { theme } from '../../../styles/Theme'

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

type Props = {
  id: string
  title: string
  type: 'Sell' | 'Rent'
  available: boolean
  price: number
  pictureURL: string
}

const HorizontalListingBar = (props: Props) => {
  const navigate = useNavigate()
  const { title, type, available, price, pictureURL } = { ...props }
  const { h2 } = { ...theme.typography.fontSize }

  const [statusText, setStatusText] = useState('')

  useEffect(() => {
    if (type === 'Sell') {
      setStatusText(available ? 'For Sale' : 'Sold')
    } else {
      setStatusText(available ? 'For Rent' : 'Rented Out')
    }
  }, [])

  const onClick = () => {
    navigate(`${PATHS.ITEM}/${props.id}`)
  }

  return (
    <ListingBarDiv onClick={onClick}>
      <ListingInfoDiv>
        <ListingTitle fontType={h2}>{title}</ListingTitle>
        <ListingStatusDiv>
          <StatusLabel type={type} available={available}>
            {statusText}
          </StatusLabel>
          <PriceTag>
            for&nbsp;
            <b>
              <PriceStyled>${price.toFixed(2)}</PriceStyled>
              {type === 'Rent' && '/day'}
            </b>
          </PriceTag>
        </ListingStatusDiv>
      </ListingInfoDiv>
      <ItemPic src={pictureURL ? pictureURL : defaultPic} />
    </ListingBarDiv>
  )
}

export default HorizontalListingBar
