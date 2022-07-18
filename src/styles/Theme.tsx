import React from 'react'
import { DefaultTheme, FontType, ThemeProvider, Typography } from 'styled-components'
import { useAppSelector } from '../app/hooks'

const defaultTypography: Typography = {
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
}

const lightTheme: DefaultTheme = {
  palette: {
    common: {
      black: '#271801',
      white: '#fdfdfb',
      gray: {
        dark: '#717a99',
        light: '#e5e5e5',
      },
    },
    text: {
      default: '#271801',
      black: '#271801',
      white: '#fdfdfb',
    },
    primary: '#719972',
    secondary: '#816353',
    danger: '#997198',
    highlight: {
      normal: '#b89cb7',
      regular: '#997198',
      light: '#e0d4e0',
      dark: '#7a5a7a',
    },
    background: '#ebe8d7',
  },
  typography: defaultTypography,
}

const darkTheme: DefaultTheme = {
  palette: {
    common: {
      black: '#271801',
      white: '#e4e4e2',
      gray: {
        dark: '#717a99',
        light: '#c4c4c4',
      },
    },
    text: {
      default: '#fdfdfb',
      black: '#271801',
      white: '#fdfdfb',
    },
    primary: '#816353',
    secondary: '#5a7a5b',
    danger: '#997198',
    highlight: {
      normal: '#b89cb7',
      regular: '#997198',
      light: '#e0d4e0',
      dark: '#7a5a7a',
    },
    background: '#cbcac4',
  },
  typography: defaultTypography,
}

function Theme({ children }: { children: React.ReactNode }) {
  const { themeMode } = useAppSelector((state) => state.auth_reducer)
  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>{children}</ThemeProvider>
  )
}

/**
 * @param fontType a FontType object
 * @return a css clamp() string with the fontType data formatted in e.g. 'clamp(14px, 1vw, 18px)'
 */

export const getClamp = (fontType: FontType) => {
  const { min, size, max } = fontType

  return `clamp(${min},${size},${max})`
}

export default Theme
