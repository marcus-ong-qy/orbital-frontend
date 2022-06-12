import { Input } from 'antd'
import styled from 'styled-components'
import { fontTypeCss } from '../../../../styles/index.styled'
import { FontType } from '../../../../styles/Theme'

export const ChatAppletDiv = styled.div`
  width: 100%;
  height: 100%;
`

export const ChatAppletHeaderDiv = styled.div`
  width: 100%;
  height: 86px;
`

export const ProfilePic = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 50%;
`

export const ChatProductBannerDiv = styled.div`
  width: 100%;
  height: 88px;
`

export const ReceipientUsername = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
`

export const ProductTitle = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
`

export const ProductInfo = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
`

export const ChatMessagesDiv = styled.div``

export const MessageForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;

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
  cursor: pointer;

  :hover {
    box-shadow: 1px 2px ${(props) => props.theme.palette.common.gray.light};
    transition: all 0.1s ease-out;
    transform: scale(1.05);
  }
`

export const PictureIcon = styled.img`
  width: 26px;
  height: 28px;
`

export const SendIcon = styled.img`
  width: 28.5px;
  height: 26px;
`
