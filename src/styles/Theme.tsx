import React from 'react';
import { ThemeProvider } from 'styled-components';

type HexCode = `#${string}`;

export type ThemeType = {
  palette: {
    common: {
      black: HexCode;
      white: HexCode;
      darkgray: HexCode;
      gray: HexCode;
      lightgray: HexCode;
    };
    primary: HexCode;
    secondary: HexCode;
    danger: HexCode;
    background: HexCode;
  };
  typography: {
    main: string;
    fontSize: {
      body: FontType;
      navTitleFont: FontType;
      navLinkFont: FontType;
      h1: FontType;
      h2: FontType;
      h3: FontType;
      h4: FontType;
    };
  };
};

export type FontType = {
  min: string;
  size: string;
  max: string;
  weight: string;
  height: string;
};

export const theme: ThemeType = {
  palette: {
    common: {
      black: '#000',
      white: '#fff',
      darkgray: '#717a99',
      gray: '#e5e5e5',
      lightgray: '#c4c4c4',
    },
    primary: '#719972',
    secondary: '#816353',
    danger: '#997198',
    background: '#ebe8d7',
  },
  typography: {
    main: 'Inter',
    fontSize: {
      body: {
        min: '16px',
        size: '1.35vw',
        max: '20px',
        weight: '300',
        height: '',
      },
      navTitleFont: {
        min: '23px',
        size: '2.3vw',
        max: '44px',
        weight: '700',
        height: '0.7',
      },
      navLinkFont: {
        min: '16px',
        size: '1.2vw',
        max: '20px',
        weight: '700',
        height: '1',
      },
      h1: {
        min: '22px',
        size: '2vw',
        max: '40px',
        weight: '700',
        height: '0.7',
      },
      h2: {
        min: '18px',
        size: '1.2vw',
        max: '22px',
        weight: '600',
        height: '1.5',
      },
      h3: {
        min: '16px',
        size: '1.2vw',
        max: '20px',
        weight: '500',
        height: '1',
      },
      h4: {
        min: '12px',
        size: '1vw',
        max: '18px',
        weight: '300',
        height: 'auto',
      },
    },
  },
};

function Theme({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme;
