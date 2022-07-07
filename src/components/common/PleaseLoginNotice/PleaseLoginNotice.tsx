import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../../routes/PATHS'

const PleaseLoginNotice = () => {
  const navigate = useNavigate()
  return (
    <h1>
      Forbidden: Please&nbsp;
      <span
        style={{ cursor: 'pointer', textDecoration: 'underline' }}
        onClick={() => navigate(PATHS.LOGIN)}
      >
        Log In
      </span>
    </h1>
  )
}

export default PleaseLoginNotice
