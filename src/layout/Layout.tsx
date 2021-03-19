import React from 'react'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'
import { MDXProvider } from '@mdx-js/react'
import { theme, mediaQueries } from '../theme.js'
import { GlobalStyles } from '../globalStyles.js'
import { Header, YoutubeEmbed } from '../components'

export const ContentWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 1em;

  ${mediaQueries.medium} {
    width: 70%;
  }
  ${mediaQueries.large} {
    width: 1000px;
  }
`

export function Layout({ children, fullWidth = false }) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Helmet>
          <title>antn.se</title>
        </Helmet>
        <GlobalStyles />
        <ContentWrapper>
          <Header />
        </ContentWrapper>
        <MDXProvider components={{ YoutubeEmbed }}>
          {fullWidth ? children : <ContentWrapper>{children}</ContentWrapper>}
        </MDXProvider>
      </>
    </ThemeProvider>
  )
}
