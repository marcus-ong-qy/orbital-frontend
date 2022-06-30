import 'styled-components'

declare module 'styled-components' {
  export interface FontType {
    min: string
    size: string
    max: string
    weight: string
    height: string
  }
  type HexCode = `#${string}`
  export interface Typography {
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
  export interface DefaultTheme {
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
        regular: HexCode
        light: HexCode
        dark: HexCode
      }
      background: HexCode
    }
    typography: Typography
  }
}
