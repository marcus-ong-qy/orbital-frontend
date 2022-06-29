import { Input } from 'antd'
import styled from 'styled-components'
import { fontTypeCss } from '../../../../styles/index.styled'
import { FontType } from '../../../../styles/Theme'

export const ChatAppletDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

export const ChatAppletHeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 86px;
  padding: 19px;
`

export const ChatProductBannerDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 88px;
  padding: 15px;

  /* cursor: pointer; */

  border-top: 1px solid ${(props) => props.theme.palette.common.black};
  border-bottom: 1px solid ${(props) => props.theme.palette.common.black};
`

export const ReceipientUsername = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
`

export const ProductTitle = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
`

export const ProductInfo = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  font-weight: 700;
`

export const PriceHighlight = styled.span`
  color: ${(props) => props.theme.palette.highlight.dark};
`

export const PerDayHighlight = styled.span`
  color: ${(props) => props.theme.palette.primary};
`

export const ProductPic = styled.img`
  width: clamp(30px, 6vw, 78px);
  height: clamp(30px, 6vw, 78px);

  object-fit: contain;
`

export const ChatMessagesDiv = styled.div`
  height: 295px;
  overflow-y: scroll;
`

export const MessageForm = styled.form`
  position: absolute;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;

  width: 100%;
  height: 61px;
`

// export const SendMessageDiv = styled.div`
//   position: relative;
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
// `

export const MessageInput = styled.input`
  height: 35px;
  width: 100%;

  border-radius: 35px;
  padding-left: 12px;
`

export const SendButton = styled.button`
  margin: 5px;
  cursor: pointer;

  :hover {
    box-shadow: 1px 2px ${(props) => props.theme.palette.common.gray.light};
    transition: all 0.1s ease-out;
    transform: scale(1.05);
  }
`

export const PictureIcon = styled.img`
  margin: 5px;
  width: 26px;
  height: 28px;
`

export const SendIcon = styled.img`
  width: 28.5px;
  height: 26px;
`
