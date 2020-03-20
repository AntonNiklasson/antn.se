import React from 'react'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '../theme.js'
import { GlobalStyles } from '../globalStyles.js'
import { Header, MaxWidthContainer } from '../components'

export function BaseLayout({ children }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <>
        <Helmet>
          <title>antn.se</title>
          <link
            href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <GlobalStyles />
        <MaxWidthContainer>
          <Header />
          {children}
        </MaxWidthContainer>
      </>
    </ThemeProvider>
  )
}
