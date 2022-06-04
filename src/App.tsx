import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { Routes } from './routes/Routes'
import { store } from './store/store'

import LoadingPage from './pages/LoadingPage'
import Theme from './styles/Theme'
import { GlobalStyle } from './styles/GlobalStyles'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Theme>
          <GlobalStyle />
          <Suspense fallback={<LoadingPage />}>
            <Routes />
          </Suspense>
        </Theme>
      </BrowserRouter>
    </Provider>
  )
}

export default App
