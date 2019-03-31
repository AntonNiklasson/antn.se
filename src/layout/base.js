import React, { useState } from 'react'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'
import Header from './header'
import { MaxWidthContainer } from './utils'

import './index.styl'

const lightTheme = {
  text: '#333',
  textSecondary: '#777',
  background: '#fff',
  border: '#ddd',
  accent: 'orange',
}

const darkTheme = {
  text: '#EEE',
  textSecondary: '#BBB',
  background: '#333',
  border: '#555',
  accent: 'orange',
}

const Container = styled.div`
	min-height: 100vh;
  background: ${p => p.theme.background};
  color: ${p => p.theme.text};
  transition: background 250ms, color 250ms;
  overflow: auto;
`
const ContentWrapper = styled(MaxWidthContainer)`
  margin-top: 6em;
`

export default function BaseLayout({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    localStorage.setItem('theme', nextTheme)

    setTheme(nextTheme)
  }

  return (
		<ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <Container>
        <Helmet>
          <title>antn.se</title>
          <link
            href="https://fonts.googleapis.com/css?family=VT323"
            rel="stylesheet"
          />
        </Helmet>
        <Header toggleTheme={toggleTheme} isDarkTheme={theme === 'dark'} />
        <ContentWrapper>{children}</ContentWrapper>
      </Container>
    </ThemeProvider>
  )
}
