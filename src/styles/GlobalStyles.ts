import { createGlobalStyle } from 'styled-components'
import { ThemeType } from './Theme'

export const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  * {
      font-family: Inter;
      box-sizing: border-box;
  }

  body {
    margin: 0;
    background: ${(props) => props.theme.palette.background};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`
