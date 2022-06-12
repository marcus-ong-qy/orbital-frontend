import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../../routes/PATHS'
import { ItemListing } from '../../../store/marketplace/types'

import {
  ItemBottomDiv,
  ItemDisplayDiv,
  ItemName,
  ItemPic,
  PriceTag,
} from './styles/ItemDisplay.styled'

import catanSet from '../../../assets/catan-set.jpg'

// export type Item = {
//   id: string
//   title: string
//   price: number
//   type: 'sale' | 'rent'
// }

const ItemDisplay = ({ item }: { item: ItemListing }) => {
  const navigate = useNavigate()

  const onClick = () => {
    navigate(`${PATHS.ITEM}/${item._id}`)
  }

  return (
    <ItemDisplayDiv id={item._id} onClick={onClick}>
      <ItemPic src={item.imageURL ?? catanSet} />
      <ItemName>{item.name}</ItemName>
      <ItemBottomDiv>
        <PriceTag>${item.price.toFixed(2)}</PriceTag>
      </ItemBottomDiv>
    </ItemDisplayDiv>
  )
}

export default ItemDisplay
