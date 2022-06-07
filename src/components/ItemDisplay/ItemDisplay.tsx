import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../routes/PATHS'

import {
  ItemBottomDiv,
  ItemDisplayDiv,
  ItemName,
  ItemPic,
  PriceTag,
} from './styles/ItemDisplay.styled'

import catanSet from '../../assets/catan-set.jpg'

export type Item = {
  id: string
  title: string
  price: number
  type: 'sale' | 'rent'
}

const ItemDisplay = ({ item }: { item: Item }) => {
  const navigate = useNavigate()

  const onClick = () => {
    navigate(`${PATHS.ITEM}/${item.id}`)
  }

  return (
    <ItemDisplayDiv id={item.id} onClick={onClick}>
      <ItemPic src={catanSet} />
      <ItemName>{item.title}</ItemName>
      <ItemBottomDiv>
        <PriceTag>${item.price.toFixed(2)}</PriceTag>
      </ItemBottomDiv>
    </ItemDisplayDiv>
  )
}

export default ItemDisplay
