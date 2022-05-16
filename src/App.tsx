import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { Routes } from "./routes/Routes";
import { store } from "./store/store";

import LoadingPage from "./pages/LoadingPage";
import Theme from "./styles/Theme";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<LoadingPage />}>
          <Theme>
            <Routes />
          </Theme>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
