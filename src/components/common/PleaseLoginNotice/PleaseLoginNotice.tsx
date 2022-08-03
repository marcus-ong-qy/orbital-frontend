import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../../routes/PATHS'
import { LoginLink } from './styles/PleaseLoginNotice.styled'

const PleaseLoginNotice = () => {
  const navigate = useNavigate()
  return (
    <h1>
      Forbidden: Please&nbsp;
      <LoginLink onClick={() => navigate(PATHS.LOGIN)}>Log In</LoginLink>
    </h1>
  )
}

export default PleaseLoginNotice
