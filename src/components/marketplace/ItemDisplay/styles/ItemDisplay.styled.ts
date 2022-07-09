import styled, { FontType } from 'styled-components'
import { fontTypeCss } from '../../../../styles/index.styled'

export const ItemDisplayDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 379px;
  width: 210px;

  margin: 34px;
  border-radius: 6px;
  overflow: hidden;

  background: ${(props) => props.theme.palette.common.white};
  box-shadow: 0 5px 20px ${(props) => props.theme.palette.common.gray.light};

  cursor: pointer;

  :hover {
    transition: all 0.1s ease-out;
    transform: scale(1.02) translateY(-6px);
  }
`

export const ItemPic = styled.img`
  width: 100%;
  height: 235px;

  object-fit: cover;
`

export const ItemName = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  width: 100%;
  height: 81px;
  padding: 9px;

  font-weight: 800;
  font-size: 24px;
  line-height: 32px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
`

export const ItemBottomDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

export const PriceTag = styled.div`
  font-weight: 800;
  font-size: 26px;
  line-height: 48px;
  margin: 6px;
  margin-right: 0;

  color: ${(props) => props.theme.palette.highlight.regular};
`

export const PriceTagSuffix = styled.div`
  width: 100%;
  font-weight: 800;
  font-size: 26px;
  line-height: 48px;
  margin: 6px;

  color: ${(props) => props.theme.palette.primary};
`

// export const TypeIndicatorDiv = styled.div<{ type: 'sale' | 'rent' }>`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;

//   font-weight: 800;
//   font-size: 26px;
//   line-height: 48px;

//   width: 92px;
//   height: 51px;
//   border-radius: 51px;

//   color: ${(props) => props.theme.palette.text.white};
//   background: ${(props) =>
//     props.type === 'sale' ? props.theme.palette.primary : props.theme.palette.secondary};
// `
