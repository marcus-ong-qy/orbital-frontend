import React from 'react'
import { ThemeProvider } from 'styled-components'

type HexCode = `#${string}`

export type ThemeType = {
  palette: {
    common: {
      black: HexCode
      white: HexCode
      gray: {
        dark: HexCode
        normal: HexCode
        light: HexCode
      }
    }
    primary: HexCode
    secondary: HexCode
    danger: HexCode
    highlight: {
      normal: HexCode
      light: HexCode
      dark: HexCode
    }
    background: HexCode
  }
  typography: {
    main: string
    fontSize: {
      body: FontType
      navTitleFont: FontType
      navLinkFont: FontType
      h1: FontType
      h2: FontType
      h3: FontType
      p: FontType
      labelFont: FontType
    }
  }
}

export type FontType = {
  min: string
  size: string
  max: string
  weight: string
  height: string
}

export const theme: ThemeType = {
  palette: {
    common: {
      black: '#000',
      white: '#fff',
      gray: {
        dark: '#717a99',
        normal: '#e5e5e5',
        light: '#c4c4c4',
      },
    },
    primary: '#719972',
    secondary: '#816353',
    danger: '#997198',
    highlight: {
      normal: '#997198',
      light: '#e0d4e0',
      dark: '#7a5a7a',
    },
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
        min: '21px',
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
      p: {
        min: '14px',
        size: '1vw',
        max: '18px',
        weight: '500',
        height: '',
      },
      labelFont: {
        min: '14px',
        size: '14px',
        max: '14px',
        weight: '300',
        height: 'auto',
      },
    },
  },
}

function Theme({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export const getClamp = (fontType: FontType) => {
  const { min, size, max } = fontType

  return `clamp(${min}, ${size}, ${max})`
}

export default Theme
