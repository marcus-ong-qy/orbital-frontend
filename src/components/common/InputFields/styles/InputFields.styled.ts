import styled, { FontType } from 'styled-components'
import { Input } from 'antd'
import { fontTypeCss } from '../../../../styles/index.styled'

export const InputFieldContainer = styled.div`
  margin: 1.2vh 0;
`

export const StyledInput = styled.input`
  height: 35px;
  width: 100%;
  padding-left: 12px;

  border-radius: 35px;
`

export const PasswordSpan = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;

  .ant-input {
    width: 100%;
  }
  .ant-input-password {
    position: relative;
    display: flex;
  }

  .ant-input-suffix {
    position: absolute;
    height: 100%;
    right: 12px;
  }
`

export const StyledBigA = styled.div`
  position: absolute;
  right: 28px;

  height: 35px;
  width: 30px;

  line-height: 35px;

  font-size: 22px;
  font-weight: 600;
  text-decoration: underline;
  text-align: center;

  cursor: default;
`

export const StyledPasswordInput = styled(Input.Password)`
  height: 35px;
  width: 100%;

  .ant-input {
    height: 35px;
    border-radius: 35px;
    padding-left: 12px;
  }
  .ant-input-suffix {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const AlwaysLoggedInSpan = styled.span<{ fontType: FontType }>`
  ${fontTypeCss}
  font-weight: 700;
`

export const PasswordLowerSpan = styled.span`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5vh;
`
