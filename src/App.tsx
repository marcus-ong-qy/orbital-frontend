import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { Routes } from "./routes/Routes";
import { store } from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes />
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
