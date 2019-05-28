import React, { useState } from 'react'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'
import { base, light, dark } from '../theme.js'
import { GlobalStyles } from '../globalStyles.js'
import { Header, MaxWidthContainer } from '../components'

const ChildContainer = styled(MaxWidthContainer)`
  margin-top: 5em;
`

export function BaseLayout({ children }) {
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    setTheme(nextTheme)
  }

  return (
    <ThemeProvider theme={base}>
      <ThemeProvider theme={theme === 'dark' ? dark : light}>
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
