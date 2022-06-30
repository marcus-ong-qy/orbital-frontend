import { createGlobalStyle, DefaultTheme } from 'styled-components'

export const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
  * {
    box-sizing: border-box;
    color: ${(props) => props.theme.palette.common.black};
    font-family: ${(props) => props.theme.typography.main}, 
      'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', sans-serif;
  }

  body {
    margin: 0;
    background: ${(props) => props.theme.palette.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`
