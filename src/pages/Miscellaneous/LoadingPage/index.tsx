import { StyledLoadingPage } from './styles/LoadingPage.styled'

import LoadingSpin from '../../../components/common/LoadingSpin/LoadingSpin'

const LoadingPage = () => {
  return (
    <StyledLoadingPage>
      <LoadingSpin />
    </StyledLoadingPage>
  )
}

export default LoadingPage
