import React, { useState } from 'react'
import Helmet from 'react-helmet'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import Header from './header'
import { MaxWidthContainer } from './utils'
import { storage } from '../utils'
import { lightTheme, darkTheme } from './themes'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    min-height: 100%;
    padding-bottom: 5em;
    font: 18px / 1.4 'Oswald', 'Helvetica Neue', Helvetica, sans-serif;
    font-weight: 300;
    background: ${p => p.theme.background};
    color: ${p => p.theme.text};
    transition: background 250ms, color 250ms;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${p => p.theme.text};
    line-height: 1.2;
    font-weight: 600;
  }
  p {
    margin: 1em 0;
  }
  a {
    text-decoration: none;
    color: ${p => p.theme.text};
    &:hover {
      color: ${p => p.theme.textSecondary};
    }
  }
  img {
    max-width: 100%;
  }
  hr {
    width: 60%;
    height: 1px;
    margin: 2em auto;
    border: none;
    background: ${p => p.theme.border};
  }
  .twitter-tweet {
    margin: 1em auto;
  }
  pre {
    background: #333;
    padding: 1em;
    font-size: 16px;
    color: #CCC;
    margin: 1em 0;
  }
`

const ContentWrapper = styled(MaxWidthContainer)`
  margin-top: 6em;
`

export default function BaseLayout({ children }) {
  const [theme, setTheme] = useState(storage.get('theme') || 'light')
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    storage.set('theme', nextTheme)

    setTheme(nextTheme)
  }

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <React.Fragment>
        <GlobalStyles />
        <Helmet>
          <title>antn.se</title>
          <link
            href="https://fonts.googleapis.com/css?family=Oswald:300,600"
            rel="stylesheet"
          />
        </Helmet>
        <Header toggleTheme={toggleTheme} isDarkTheme={theme === 'dark'} />
        <ContentWrapper>{children}</ContentWrapper>
      </React.Fragment>
    </ThemeProvider>
  )
}
