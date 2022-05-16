import React from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";

const theme: DefaultTheme = {
  palette: {
    common: {
      black: "#000",
      white: "#fff",
      darkgray: "#717a99",
      gray: "#e5e5e5",
      lightgray: "#c4c4c4",
    },
    primary: "#719972",
    secondary: "#816353",
    danger: "#997198",
    background: "#ebe8d7",
  },
  typography: {
    main: "Inter",
    fontSize: {
      body: {
        min: "16px",
        size: "1.35vw",
        max: "20px",
        weight: "300",
        height: "",
      },
      input: {
        min: "16px",
        size: "1.3vw",
        max: "20px",
        weight: "300",
        height: "2",
      },
      sectionTitle: {
        min: "16px",
        size: "1.8vw",
        max: "28px",
        weight: "600",
        height: "",
      },
      sectionText: {
        min: "12px",
        size: "1.25vw",
        max: "20px",
        weight: "300",
        height: "",
      },
      h1: {
        min: "20px",
        size: "2vw",
        max: "38px",
        weight: "300",
        height: "1",
      },
      h2: {
        min: "18px",
        size: "1.2vw",
        max: "22px",
        weight: "600",
        height: "1.5",
      },
      h3: {
        min: "16px",
        size: "1.2vw",
        max: "20px",
        weight: "500",
        height: "1",
      },
      previewTitle: {
        min: "16px",
        size: "1.5vw",
        max: "24px",
        weight: "500",
        height: "auto",
      },
      h4: {
        min: "10px",
        size: "1vw",
        max: "18px",
        weight: "300",
        height: "auto",
      },
    },
  },
};

function Theme({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme;
