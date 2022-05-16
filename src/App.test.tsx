import React from "react";
import {
  getByText,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";

const AppWithStore = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

test("loading screen appears", () => {
  render(<AppWithStore />);
  expect(screen.queryByText(/loading/i)).toBeInTheDocument();
});

test("login button has corect text", async () => {
  render(<AppWithStore />);
  const loginButton = screen.getByRole("button", { name: "Login" });

  await waitFor(() => {
    expect(loginButton).toBeInTheDocument();
  });
});
