import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../../routes/PATHS'
import { LoginLink, StyledLoginToasterText } from './styles/PleaseLoginToasterText.styled'

const PleaseLoginToasterText = () => {
  const navigate = useNavigate()
  return (
    <StyledLoginToasterText>
      Please&nbsp;
      <LoginLink onClick={() => navigate(PATHS.LOGIN)}>Log In</LoginLink>
      &nbsp;to use this Feature!
    </StyledLoginToasterText>
  )
}

export default PleaseLoginToasterText
