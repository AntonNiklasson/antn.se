import React, { useState } from 'react'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'
import { base, light } from '../theme.js'
import { GlobalStyles } from '../globalStyles.js'
import { Header, MaxWidthContainer } from '../components'
import { storage } from '../utils'

const ChildContainer = styled(MaxWidthContainer)`
  margin-top: 5em;
`

export function BaseLayout({ children }) {
  const [theme, setTheme] = useState(
    storage.get('theme') === 'dark' ? 'dark' : 'light',
  )

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    setTheme(nextTheme)
    storage.set('theme', nextTheme)
  }

  // Hardcoding the light theme for now.
  // Until fixing the issues with toggling between them.
  return (
    <ThemeProvider theme={base}>
      <ThemeProvider theme={light}>
        <React.Fragment>
          <GlobalStyles />
          <Helmet>
            <title>antn.se</title>
          </Helmet>
          <Header toggleTheme={toggleTheme} isDarkTheme={theme === 'dark'} />
          <ChildContainer>{children}</ChildContainer>
        </React.Fragment>
      </ThemeProvider>
    </ThemeProvider>
  )
}
